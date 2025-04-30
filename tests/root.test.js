const request = require('supertest');
const app = require('../src/api/index');

describe('Root API', () => {
  test('GET / returns API is running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('API is running');
  });
});
