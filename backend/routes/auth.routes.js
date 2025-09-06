// routes/auth.routes.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

// POST /api/auth/register - Register a new user
router.post('/register', register);

// POST /api/auth/login - Login existing user
router.post('/login', login);

module.exports = router;
