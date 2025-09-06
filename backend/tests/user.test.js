// tests/user.test.js

const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

describe('User Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await db.sync({ force: true });

    // Create a user directly in DB
    const passwordHash = await bcrypt.hash('TestPass123!', 10);
    const user = await User.create({
      email: 'user@example.com',
      username: 'testuser',
      passwordHash,
    });
    userId = user.id;

    // Generate JWT token for auth
    token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await db.close();
  });

  test('Get user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('email', 'user@example.com');
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  test('Update user profile', async () => {
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ bio: 'Updated bio', username: 'updateduser' });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('bio', 'Updated bio');
    expect(res.body.user).toHaveProperty('username', 'updateduser');
  });

  test('Unauthorized without token', async () => {
    const res = await request(app)
      .get('/api/users/me');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
