import { MongoClient } from "mongodb";

const globalWithMongo = global as typeof globalThis & { mongoClient?: MongoClient, mongoPromise: Promise<MongoClient> };

if (globalWithMongo.mongoClient === undefined) {
  globalWithMongo.mongoClient = new MongoClient(process.env.MONGODB_URI || "", {
    maxPoolSize: 8,
    minPoolSize: 2,
    maxIdleTimeMS: 2 * 60 * 1000
  });
  
  globalWithMongo.mongoPromise = globalWithMongo.mongoClient.connect();
}

export async function connectToDatabase() {
  const client = await globalWithMongo.mongoPromise;
  const db = client.db("mainWebsite");
  return { client, db };
}
