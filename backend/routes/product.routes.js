// routes/product.routes.js

const express = require('express');
const router = express.Router();
const {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { authenticateToken } = require('../middleware/auth');

// Public route: list and get product details
router.get('/', listProducts);
router.get('/:id', getProductById);

// Protected routes: create, update, delete product
router.post('/', authenticateToken, createProduct);
router.patch('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
