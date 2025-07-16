import { mongoHealthcheck } from "../config/mongoClient";
import { ActuatorEndpointsResponse } from "../types/ActuatorEndpointsResponse";
import { ActuatorHealthResponse } from "../types/ActuatorHealthResponse";

export const getActuatorEndpoints = (): ActuatorEndpointsResponse => {
  return {
    health: '/actuator/health',
    info: '/actuator/info',
    metrics: '/actuator/metrics'
  }
}

export const getHealth = async (): Promise<ActuatorHealthResponse> => {
  let mongoStatus = 'DOWN';
  let mongoError = null;

  try {
    const mongoHealth = await mongoHealthcheck()

    if (mongoHealth.ok === 1) {
      mongoStatus = 'UP';
    }
  } catch (error) {
    mongoError = error instanceof Error ? error.message : String(error);
  }

  const overallStatus = mongoStatus === 'UP' ? 'UP' : 'DOWN';
  const statusCode = overallStatus === 'UP' ? 200 : 503;

  const healthResponse: ActuatorHealthResponse = {
    statusCode: statusCode,
    components: {
      app: { status: 'UP' },
      mongo: mongoError ?
        { status: 'DOWN', error: mongoError }
        :
        { status: mongoStatus }
    }
  }

  return healthResponse
}