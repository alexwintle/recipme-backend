import { Request, Response } from "express";
import { getActuatorEndpoints } from "../../../controller/actuatorController";

describe('getActuatorEndpoints', () => {
  test('returns correct actuator endpoints', () => {
    const mockReq = {} as Request;
    const mockRes: Partial<Response> = {
      json: jest.fn()
    };

    getActuatorEndpoints(mockReq, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      health: '/actuator/health',
      info: '/actuator/info',
      metrics: '/actuator/metrics'
    });
  });
});
