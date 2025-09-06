// routes/user.routes.js

const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth');

// Protect routes with authentication middleware
router.get('/me', authenticateToken, getProfile);
router.patch('/me', authenticateToken, updateProfile);

module.exports = router;
