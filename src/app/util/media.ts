import {GetObjectCommand, S3} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export const bucket = process.env.S3_BUCKET as string;
export const s3client = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS as string,
    secretAccessKey: process.env.AWS_SECRET as string
  }
})

export async function findSignedURL(key: string, isAttachment?: boolean): Promise<string> {
  return await getSignedUrl(s3client, new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentDisposition: isAttachment ? "attachment" : undefined
  }));
}