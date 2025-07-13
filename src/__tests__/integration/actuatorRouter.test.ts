import request from 'supertest';
import app from '../../app';

describe('GET responses', () => {

  test('Should list actuator endpoints when GET /actuator/list', async () => {
    const response = await request(app).get('/actuator/list');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('health');
    expect(response.body).toHaveProperty('info');
    expect(response.body).toHaveProperty('metrics');
  });

});