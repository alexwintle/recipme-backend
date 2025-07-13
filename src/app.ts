import express, { Express } from 'express';
import actuator from 'express-actuator';
import { getActuatorEndpoints } from './controller/actuatorController';

const app: Express = express();

const actuatorOptions = {
  basePath: '/actuator',
  customEndpoints: [
    {
      id: 'list',
      controller: getActuatorEndpoints
    }
  ]
}

app.use(actuator(actuatorOptions))

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('Hello from RecipMe!');
});

app.listen(PORT, () => {
  console.log(`🚀 RecipMe backend running at http://localhost:${PORT}`);
});