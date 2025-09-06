// routes/cart.routes.js

const express = require('express');
const router = express.Router();
const {
  addToCart,
  viewCart,
  removeFromCart,
} = require('../controllers/cart.controller');
const { authenticateToken } = require('../middleware/auth');

// Protect all cart routes with authentication
router.post('/items', authenticateToken, addToCart);
router.get('/items', authenticateToken, viewCart);
router.delete('/items/:id', authenticateToken, removeFromCart);

module.exports = router;
