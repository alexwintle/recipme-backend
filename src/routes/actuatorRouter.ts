import express from 'express';
import { getActuatorEndpoints } from '../controller/actuatorController';


const actuatorRouter = express.Router();

actuatorRouter.route('/').get(getActuatorEndpoints)

export default actuatorRouter;