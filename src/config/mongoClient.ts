import { MongoClient, Db } from 'mongodb';

const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(connectionString);

let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  try {
    await client.connect();
    db = client.db('recipme');
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  console.log("Closing MongoDB connection...");
  await client.close();
  db = null;
  console.log("MongoDB connection closed");
};