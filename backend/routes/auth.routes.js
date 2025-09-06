// In backend/routes/auth.routes.js

const express = require('express');
const router = express.Router();
// --- Import the new updateUserProfile function ---
const { register, login, getUserProfile, updateUserProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// ... (keep your existing register and login routes)

// --- GET /api/auth/profile - Get user profile ---
router.get('/profile', authMiddleware, getUserProfile);

// --- PUT /api/auth/profile - Update user profile ---
router.put('/profile', authMiddleware, updateUserProfile); // <-- ADD THIS NEW ROUTE

module.exports = router;