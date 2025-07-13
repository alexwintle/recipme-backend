import { MongoClient, Db } from 'mongodb';
import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';

let client: MongoClient;
let db: Db;
let container: StartedMongoDBContainer;

export const startTestDatabase = async () => {
  try {
    container = await new MongoDBContainer('mongo:6.0.1').start();

    const baseUri = container.getConnectionString();
    const uri = `${baseUri}?directConnection=true`;

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('testdb');

    return { uri, db };
  } catch (error) {
    console.error('Error starting or connecting to testcontainers database:', error);
    throw error;
  }
}

export async function stopTestDatabase() {
  try {
    await client?.close();
    await container?.stop();
  } catch (error) {
    console.error('Error stopping testcontainers database:', error);
    throw error;
  }
}
