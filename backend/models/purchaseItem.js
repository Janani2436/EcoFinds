// models/purchaseItem.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Purchase = require('./purchase');
const Product = require('./product');

const PurchaseItem = db.define('PurchaseItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'purchases', key: 'id' },
    onDelete: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'id' },
    onDelete: 'CASCADE',
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },
}, {
  timestamps: false,
  tableName: 'purchase_items',
});

// Associations
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId' });
PurchaseItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = PurchaseItem;
