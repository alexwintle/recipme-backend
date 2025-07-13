import { MongoClient, Db } from 'mongodb';

const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(connectionString);

let db: Db | null = null;
let isConnected = false;

export const connectToDatabase = async (): Promise<Db> => {
  if (isConnected && db) return db;

  try {
    await client.connect();
    db = client.db('recipme');
    isConnected = true;
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  if (isConnected) {
    console.log("Closing MongoDB connection...");
    await client.close();
    isConnected = false;
    db = null;
    console.log("MongoDB connection closed");
  } else {
    console.log("MongoDB connection already closed or not yet established.");
  }
};