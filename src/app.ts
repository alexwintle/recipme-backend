import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express, { Express } from 'express';
import actuator from 'express-actuator';
import actuatorRouter from './routes/actuatorRouter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();

const actuatorOptions = {
  basePath: '/actuator'
}

app.use(actuator(actuatorOptions))
app.use('/actuator', actuatorRouter)

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('Hello from RecipMe!');
});

app.listen(PORT, () => {
  console.log(`🚀 RecipMe backend running at http://localhost:${PORT}`);
});