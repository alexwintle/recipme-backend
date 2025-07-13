import express, { Express } from 'express';
import actuator from 'express-actuator';
import { getActuatorEndpointsResponse, getHealthResponse } from './controller/actuatorController';
import { setTestDb } from './config/mongoClient';
import { Db } from 'mongodb';

export const createExpressApp = (dbInstance?: Db) => {
  const app: Express = express();

  if (dbInstance) {
    setTestDb(dbInstance);
  }

  const actuatorOptions = {
    basePath: '/actuator',
    customEndpoints: [
      {
        id: 'list',
        controller: getActuatorEndpointsResponse
      },
      {
        id: 'health',
        controller: getHealthResponse
      }
    ],
  }

  app.use(actuator(actuatorOptions))

  return app;
}