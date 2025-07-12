import { Request, Response } from "express";
import { ActuatorEndpointsResponse } from "../types/ActuatorEndpointsResponse";

export const getActuatorEndpoints = (req: Request, res: Response): void => {
  const endpoints: ActuatorEndpointsResponse = {
    health: '/actuator/health',
    info: '/actuator/info',
    metrics: '/actuator/metrics'
  }

  res.json(endpoints)
}