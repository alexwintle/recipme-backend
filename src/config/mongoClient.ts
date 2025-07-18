import { MongoClient, Db, Collection, Document } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const getConfig = () => {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME;

  if (!uri) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  return { uri, dbName };
};

const createClient = async (): Promise<MongoClient> => {
  if (!client) {
    const { uri, dbName } = getConfig();

    try {
      client = await new MongoClient(uri).connect();
      db = client.db(dbName);
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      client = null;
      db = null;
      throw err;
    }
  }

  return client;
};

const getDb = async (): Promise<Db> => {
  if (!client || !db) {
    await createClient();
  }

  return db!;
};

const accessCollection = async <T extends Document>(collectionName: string): Promise<Collection<T>> => {
  if (!collectionName) {
    throw new Error('Please provide the name of a collection you would like to access.');
  }

  const dbInstance = await getDb();
  return dbInstance.collection<T>(collectionName);
};

const mongoHealthcheck = async (): Promise<Document> => {
  const dbInstance = await getDb();
  return dbInstance.admin().ping();
};

const closeDatabase = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

const initializeDb = async () => {
  const dbInstance = await getDb();
  const usersCollection = dbInstance.collection('users');

  await usersCollection.createIndex({ uid: 1 }, { unique: true });
};

export {
  initializeDb,
  closeDatabase,
  mongoHealthcheck,
  accessCollection
}