// tests/purchase.test.js

const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const CartItem = require('../models/cartItem');
const Purchase = require('../models/purchase');
const PurchaseItem = require('../models/purchaseItem');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

describe('Purchase Routes', () => {
  let token;
  let userId;
  let productId;

  beforeAll(async () => {
    await db.sync({ force: true });

    // Create user
    const passwordHash = await bcrypt.hash('PurchPass123!', 10);
    const user = await User.create({
      email: 'purchaseuser@example.com',
      username: 'purchaseuser',
      passwordHash,
    });
    userId = user.id;
    token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    // Create category and product
    const category = await Category.create({ name: 'Toys' });
    const product = await Product.create({
      userId,
      categoryId: category.id,
      title: 'Toy Car',
      description: 'Mini toy car',
      price: 25.0,
    });
    productId = product.id;

    // Add product to cart
    await CartItem.create({
      userId,
      productId,
      quantity: 3,
    });
  });

  afterAll(async () => {
    await db.close();
  });

  test('Checkout purchase from cart', async () => {
    const res = await request(app)
      .post('/api/purchases/checkout')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('purchaseId');
    expect(res.body).toHaveProperty('total');
    expect(res.body.message).toMatch(/successfully/i);
  });

  test('Get purchase history', async () => {
    const res = await request(app)
      .get('/api/purchases')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.purchases.length).toBeGreaterThanOrEqual(1);
    expect(res.body.purchases[0]).toHaveProperty('PurchaseItems');
  });
});
