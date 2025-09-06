// tests/auth.test.js

const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');

describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.sync({ force: true }); // Reset DB before tests
  });

  afterAll(async () => {
    await db.close();
  });

  const testUser = {
    email: 'test@example.com',
    password: 'Password123!',
    username: 'testuser',
  };

  test('Register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(testUser.email);
  });

  test('Prevent duplicate email registration', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  test('Login registered user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe(testUser.email);
  });

  test('Reject login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('Reject login for unregistered email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'notfound@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
