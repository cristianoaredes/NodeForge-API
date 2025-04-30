const request = require('supertest');
const app = require('../src/api/index');

describe('Auth API', () => {
  const user = { email: 'test@example.com', password: 'password123' };
  let token;

  test('Signup endpoint - success', async () => {
    const res = await request(app).post('/auth/signup').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ email: user.email });
  });

  test('Login endpoint - success', async () => {
    const res = await request(app).post('/auth/login').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Protected route - unauthorized without token', async () => {
    const res = await request(app).get('/protected');
    expect(res.statusCode).toBe(401);
  });

  test('Protected route - authorized with valid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Protected resource');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', user.email);
  });
});
