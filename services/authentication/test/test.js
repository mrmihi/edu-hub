const request = require('supertest');
const app = require('../yourApp'); // Import your Express app

describe('POST /login', () => {
  it('should return 200 and a token when login is successful', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password', role: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 when invalid credentials are provided', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid@example.com', password: 'invalidpassword', role: 'admin' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return 400 when role is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return 400 when role is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password', role: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
