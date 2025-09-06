// middleware/auth.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

  const token = authHeader.split(' ')[1]; // Bearer tokenstring
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user; // Attach user payload to req for downstream use
    next();
  });
}

module.exports = { authenticateToken };
