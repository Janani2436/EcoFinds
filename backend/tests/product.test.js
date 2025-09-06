// tests/product.test.js

const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

describe('Product Routes', () => {
  let token;
  let userId;
  let categoryId;
  let productId;

  beforeAll(async () => {
    await db.sync({ force: true });

    // Create user
    const passwordHash = await bcrypt.hash('Pass1234!', 10);
    const user = await User.create({
      email: 'produser@example.com',
      username: 'produser',
      passwordHash,
    });
    userId = user.id;

    token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    // Create a category
    const category = await Category.create({ name: 'Electronics' });
    categoryId = category.id;
  });

  afterAll(async () => {
    await db.close();
  });

  test('Create new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Smartphone',
        description: 'A cool phone',
        categoryId: categoryId,
        price: 499.99,
        imageUrl: 'http://example.com/image.jpg',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.product).toHaveProperty('id');
    expect(res.body.product.title).toBe('Smartphone');
    productId = res.body.product.id;
  });

  test('Get product by ID', async () => {
    const res = await request(app)
      .get(`/api/products/${productId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.product).toHaveProperty('id', productId);
    expect(res.body.product.title).toBe('Smartphone');
  });

  test('List products with filter and search', async () => {
    const res = await request(app)
      .get(`/api/products?category=${categoryId}&q=smart`);

    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBeGreaterThanOrEqual(1);
  });

  test('Update product (owner)', async () => {
    const res = await request(app)
      .patch(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 450.0 });

    expect(res.statusCode).toBe(200);
    expect(res.body.product.price).toBe('450.00');
  });

  test('Delete product (owner)', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
