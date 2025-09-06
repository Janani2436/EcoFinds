// config/db.js

const { Sequelize } = require('sequelize');
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST || 'localhost',
  port: DB_PORT || 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
