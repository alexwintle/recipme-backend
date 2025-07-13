import { Request, Response } from "express";
import { getActuatorEndpointsResponse, getHealthResponse } from "../../../controller/actuatorController";
import * as actuatorService from '../../../services/actuatorService';

jest.mock('../../../services/actuatorService');

describe('Actuator Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('returns correct actuator endpoints', () => {
    const mockReq = {} as Request;
    const mockRes = { json: jest.fn() } as Partial<Response>;

    (actuatorService.getActuatorEndpoints as jest.Mock).mockReturnValue({
      health: '/actuator/health',
      info: '/actuator/info',
      metrics: '/actuator/metrics'
    });

    getActuatorEndpointsResponse(mockReq, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      health: '/actuator/health',
      info: '/actuator/info',
      metrics: '/actuator/metrics'
    });
  });

  test('returns health status when service is UP', async () => {
    const mockReq = {} as Request;
    const mockRes = { json: jest.fn() } as Partial<Response>;

    (actuatorService.getHealth as jest.Mock).mockResolvedValue({
      statusCode: 200,
      components: {
        app: { status: 'UP' },
        mongo: { status: 'UP' }
      }
    });

    await getHealthResponse(mockReq, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      statusCode: 200,
      components: {
        app: { status: 'UP' },
        mongo: { status: 'UP' }
      }
    });
  });

  test('returns health status when service is DOWN', async () => {
    const mockReq = {} as Request;
    const mockRes = { json: jest.fn() } as Partial<Response>;

    (actuatorService.getHealth as jest.Mock).mockResolvedValue({
      statusCode: 503,
      components: {
        app: { status: 'UP' },
        mongo: { status: 'DOWN', error: 'Connection refused' }
      }
    });

    await getHealthResponse(mockReq, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      statusCode: 503,
      components: {
        app: { status: 'UP' },
        mongo: { status: 'DOWN', error: 'Connection refused' }
      }
    });
  });
});
