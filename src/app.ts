import express, { Express } from 'express';
import actuator from 'express-actuator';
import { getActuatorEndpointsResponse, getHealthResponse } from './controller/actuatorController';

const app: Express = express();

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

export default app;