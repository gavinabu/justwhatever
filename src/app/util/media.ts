import {GetObjectCommand, S3} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {ObjectId, WithoutId} from "mongodb";
import {connectToDatabase} from "@/app/util/mongo";

export const bucket = process.env.S3_BUCKET as string;
export const s3client = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS as string,
    secretAccessKey: process.env.AWS_SECRET as string
  }
})

export type DBSCacheItem = {
  _id: ObjectId,
  key: string,
  expires: number, // unix time in seconds
  url: string,
  attachment: boolean,
}

export async function findSignedURL(key: string, isAttachment: boolean = true): Promise<string> {
  async function getURL() {
    const url = await getSignedUrl(s3client, new GetObjectCommand({Bucket: bucket, Key: key, ResponseContentDisposition: isAttachment ? "attachment" : undefined}));
    await db.collection<WithoutId<DBSCacheItem>>("scache").insertOne({key: key, url, expires: (Date.now() / 1000) - (5 * 60), attachment: isAttachment});
    return url;
  }
  const db = (await connectToDatabase()).db;
  const url = await db.collection<DBSCacheItem>("scache").find({key: key, attachment: isAttachment || false}).toArray();
  if(url.length < 1) return await getURL();
  for (const e1 of url.filter(e => (Date.now() / 1000) < e.expires)) {
    await db.collection<DBSCacheItem>("scache").deleteOne({_id: e1._id, attachment: isAttachment || false});
  }
  const valids = url.filter(e => (Date.now() / 1000) < e.expires).sort((a, b) => a.expires - a.expires);
  if(valids.length < 1) return await getURL();
  return valids[0].url
}