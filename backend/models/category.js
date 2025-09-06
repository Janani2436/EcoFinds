// models/category.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Category = db.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'categories',
});

module.exports = Category;
