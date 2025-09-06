// models/cartItem.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user');
const Product = require('./product');

const CartItem = db.define('CartItem', {
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'id' },
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
}, {
  timestamps: true,
  tableName: 'cart_items',
});

// Define associations
CartItem.belongsTo(User, { foreignKey: 'userId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;
