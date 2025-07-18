import express from 'express';
import actuator from 'express-actuator';
import { getActuatorEndpointsHandler, getHealthHandler } from './controller/actuatorController';
import usersRouter from './routers/usersRouter';

export const createApp = () => {
  const app = express();
  
  console.log('Initializing app with MONGO_URI:', process.env.MONGO_URI);

  const actuatorOptions = {
    basePath: '/actuator',
    customEndpoints: [
      { id: 'list', controller: getActuatorEndpointsHandler },
      { id: 'health', controller: getHealthHandler }
    ],
  };

  app.use(actuator(actuatorOptions));
  app.use(express.json());

  app.use('/users', usersRouter);

  return app;
};