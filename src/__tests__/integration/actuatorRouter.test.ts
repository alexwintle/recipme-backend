import request from 'supertest';
import app from '../../app';
import { closeConnection, connectToDatabase } from '../../config/mongoClient';

describe('GET responses', () => {

  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await closeConnection()
  })

  test('Should list actuator endpoints when GET /actuator/list', async () => {
    const response = await request(app).get('/actuator/list');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('health');
    expect(response.body).toHaveProperty('info');
    expect(response.body).toHaveProperty('metrics');
  });

  test('Should list service health when GET /actuator/health', async () => {
    const response = await request(app).get('/actuator/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('statusCode', 200);
    expect(response.body).toHaveProperty('components.app.status', 'UP');
    expect(response.body).toHaveProperty('components.mongo.status', 'UP');
  });

});