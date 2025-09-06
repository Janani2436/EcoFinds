// config/config.js

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,

  jwtSecret: process.env.JWT_SECRET || 'your-default-jwt-secret',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'ecofinds',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    dialect: 'postgres', // or 'mysql' depending on your choice
  },

  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
