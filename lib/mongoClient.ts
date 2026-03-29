import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.MONGODB_DB_NAME as string;

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env");
if (!DB_NAME) throw new Error("Missing MONGODB_DB_NAME");

const client = new MongoClient(MONGODB_URI);

const clientPromise = client.connect();

export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}
