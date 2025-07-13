import request from 'supertest';
import { createExpressApp } from '../../app';
import { startTestDatabase, stopTestDatabase } from '../utils/testDatabase';
import { closeDatabase } from '../../config/mongoClient';
import type { Application } from 'express';

let app: Application;

describe('GET responses (integration)', () => {
  beforeAll(async () => {
    const { db } = await startTestDatabase();
    app = createExpressApp(db); 
  }, 60000);

  afterAll(async () => {
    await closeDatabase();
    await stopTestDatabase();
  });

  test('Should lists endpoints', async () => {
    const res = await request(app).get('/actuator/list');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('health');
    expect(res.body).toHaveProperty('info');
    expect(res.body).toHaveProperty('metrics');
  }, 10000);

  test('Should show service health', async () => {
    const res = await request(app).get('/actuator/health');

    expect(res.status).toBe(200);
    expect(res.body.components.mongo.status).toBe('UP');
  }, 25000);
});