import request from 'supertest';
import app from '../../app';

describe('GET /actuator/list', () => {
  it('responds with actuator endpoints', async () => {
    const response = await request(app).get('/actuator/list');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('health');
    expect(response.body).toHaveProperty('info');
    expect(response.body).toHaveProperty('metrics');
  });
});