// tests/cart.test.js

const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');
const CartItem = require('../models/cartItem');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

describe('Cart Routes', () => {
  let token;
  let userId;
  let productId;
  let cartItemId;

  beforeAll(async () => {
    await db.sync({ force: true });

    // Create user
    const passwordHash = await bcrypt.hash('CartPass123!', 10);
    const user = await User.create({
      email: 'cartuser@example.com',
      username: 'cartuser',
      passwordHash,
    });
    userId = user.id;

    token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    // Create category and product
    const category = await Category.create({ name: 'Books' });
    const product = await Product.create({
      userId,
      categoryId: category.id,
      title: 'Book 1',
      description: 'A nice book',
      price: 15.99,
    });
    productId = product.id;
  });

  afterAll(async () => {
    await db.close();
  });

  test('Add item to cart', async () => {
    const res = await request(app)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });

    expect(res.statusCode).toBe(201);
    expect(res.body.cartItem).toHaveProperty('id');
    expect(res.body.cartItem.quantity).toBe(2);

    cartItemId = res.body.cartItem.id;
  });

  test('View cart items', async () => {
    const res = await request(app)
      .get('/api/cart/items')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.cartItems.length).toBeGreaterThanOrEqual(1);
    expect(res.body.cartItems[0]).toHaveProperty('product');
  });

  test('Remove item from cart', async () => {
    const res = await request(app)
      .delete(`/api/cart/items/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
