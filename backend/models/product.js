// models/product.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user');
const Category = require('./category');

const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null, // placeholder image can be handled client-side
  },
}, {
  timestamps: true,
  tableName: 'products',
});

// Define associations
Product.belongsTo(User, { foreignKey: 'userId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
