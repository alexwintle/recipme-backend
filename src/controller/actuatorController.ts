import { Request, Response } from "express";
import { getActuatorEndpoints, getHealth } from "../services/actuatorService";

export const getActuatorEndpointsHandler = (_req: Request, res: Response): void => {
  const endpoints = getActuatorEndpoints();

  res.json(endpoints)
}

export const getHealthHandler = async (_req: Request, res: Response): Promise<void> => {
  const healthResponse = await getHealth()

  res.json(healthResponse);
}