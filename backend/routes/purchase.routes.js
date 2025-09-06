// routes/purchase.routes.js

const express = require('express');
const router = express.Router();
const { checkout, getPurchaseHistory } = require('../controllers/purchase.controller');
const { authenticateToken } = require('../middleware/auth');

// Checkout cart to create a purchase
router.post('/checkout', authenticateToken, checkout);

// Get user's purchase history
router.get('/', authenticateToken, getPurchaseHistory);

module.exports = router;
