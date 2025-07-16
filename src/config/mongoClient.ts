import { MongoClient, Db, Collection, Document } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;
let db: Db | null = null;

export const createClient = async (): Promise<MongoClient> => {
  if (!clientPromise) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    try {
      const client = await new MongoClient(uri).connect();
      db = client.db(process.env.MONGO_DB_NAME || 'recipme');
      clientPromise = Promise.resolve(client);

      return client;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      clientPromise = null; // reset to allow retry
      throw err;
    }
  }

  return await clientPromise;
};

export const getDb = async (): Promise<Db> => {
  if (!clientPromise) {
    await createClient();
  }

  if (!db) {
    const client = await clientPromise!;
    db = client.db(process.env.MONGO_DB_NAME || 'recipme');
  }

  return db;
};

export const accessCollection = async <T extends Document>(collectionName: string): Promise<Collection<T>> => {
  if (!collectionName) {
    throw new Error('Please provide the name of a collection you would like to access.');
  }

  const dbInstance = await getDb();
  return dbInstance.collection<T>(collectionName);
};

export const mongoHealthcheck = async (): Promise<Document> => {
  const dbInstance = await getDb();
  return dbInstance.admin().ping();
};

export const closeDatabase = async () => {
  if (clientPromise) {
    const client = await clientPromise;
    await client.close();
    clientPromise = null;
    db = null;
  }
};