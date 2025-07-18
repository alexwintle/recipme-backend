import { createApp } from '../../../app';
import request from 'supertest';
import { startTestDatabase, stopTestDatabase } from '../../utils/testDatabase';
import { initializeDb } from '../../../config/mongoClient';
import { App } from 'supertest/types';

describe('GET responses (integration)', () => {
  let app: App;

  beforeAll(async () => {
    await startTestDatabase();
    await initializeDb();
    app = createApp()
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