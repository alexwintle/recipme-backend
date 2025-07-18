import request from 'supertest';
import { setupIntegrationTest, stopTestDatabase } from '../../utils/testDatabase';
import { App } from 'supertest/types';

describe('GET responses (integration)', () => {
  let app: App;

  beforeAll(async () => {
    app = await setupIntegrationTest();
  });

  afterAll(async () => {
    await stopTestDatabase();
  });

  test('Should lists endpoints', async () => {
    const res = await request(app).get('/actuator/list');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('health');
    expect(res.body).toHaveProperty('info');
    expect(res.body).toHaveProperty('metrics');
  });

  test('Should show service health', async () => {
    const res = await request(app).get('/actuator/health');

    expect(res.status).toBe(200);
    expect(res.body.components.mongo.status).toBe('UP');
  });
});