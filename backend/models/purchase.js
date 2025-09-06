// models/purchase.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user');

const Purchase = db.define('Purchase', {
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
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'purchases',
});

// Association
Purchase.belongsTo(User, { foreignKey: 'userId' });

module.exports = Purchase;
