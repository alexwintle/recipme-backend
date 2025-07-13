import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';

let container: StartedMongoDBContainer;

export const startTestDatabase = async () => {
  container = await new MongoDBContainer('mongo:6.0.1').withStartupTimeout(30000).start();
  const baseUri = container.getConnectionString();
  const uri = `${baseUri}?directConnection=true`;

  process.env.MONGO_URI = uri;
  process.env.MONGO_DB_NAME = 'testdb';

  return { uri };
};

export const stopTestDatabase = async () => {
  if (container) {
    await container.stop();
  }
};
