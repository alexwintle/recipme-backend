// src/config/mongoClient.ts
import { MongoClient, Db } from 'mongodb';

let _client: MongoClient | null = null;
let _db: Db | null = null;
let _testDb: Db | null = null;

export const setTestDb = (dbInstance: Db) => {
  _testDb = dbInstance;
};

export const connectToDatabase = async (): Promise<Db> => {
  if (_testDb) {
    return _testDb;
  }

  if (!_client) {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/recipme';
    _client = new MongoClient(uri);
    try {
      await _client.connect();
      _db = _client.db('recipme');
      console.log('mongoClient: Successfully connected to default/production database.');
    } catch (error) {
      console.error('mongoClient: Failed to connect to default/production database:', error);
      _client = null;
      throw error;
    }
  } else {
    console.log('mongoClient: Reusing existing default/production database client.');
  }

  return _db!;
};

export const closeDatabase = async () => {
  console.log("mongoClient: Closing database client.");
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
  }
  _testDb = null;
};