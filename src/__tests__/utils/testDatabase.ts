import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import { Collection } from 'mongodb';
import { User } from '../../model/User';
import { closeDatabase, initializeDb } from '../../config/mongoClient';
import { createApp } from '../../app';
import { App } from 'supertest/types';

let container: StartedMongoDBContainer;

export const setupIntegrationTest = async (): Promise<App> => {
  try {
    await startTestDatabase();
    await initializeDb();
    const app = createApp();

    return app;
  } catch (error) {
    console.log("Something went wrong when setting up the integration test", error)
    throw error
  }
};

const startTestDatabase = async () => {
  container = await new MongoDBContainer('mongo:6.0.1').withStartupTimeout(30000).start();
  const baseUri = container.getConnectionString();
  const uri = `${baseUri}?directConnection=true`;

  process.env.MONGO_URI = uri;
  process.env.MONGO_DB_NAME = 'testdb';

  await initializeDb();
  return { uri };
};

export const stopTestDatabase = async () => {
  if (container) {
    await container.stop();
  }

  await closeDatabase();
};

export const clearDatabase = async (collection: Collection<User>) => {
  await collection.deleteMany({});
}