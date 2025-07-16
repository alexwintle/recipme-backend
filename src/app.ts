import express from 'express';
import actuator from 'express-actuator';
import { getActuatorEndpointsHandler, getHealthHandler } from './controller/actuatorController';
import usersRouter from './routes/usersRouter';

const app = express();

const actuatorOptions = {
  basePath: '/actuator',
  customEndpoints: [
    { id: 'list', controller: getActuatorEndpointsHandler },
    { id: 'health', controller: getHealthHandler }
  ],
};

app.use(actuator(actuatorOptions));

app.use('/users', usersRouter)

export default app;
