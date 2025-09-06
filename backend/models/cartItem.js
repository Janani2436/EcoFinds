'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {}
  CartItem.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    // Foreign keys for user and product would be defined here in a full app
  }, { sequelize, modelName: 'CartItem', timestamps: true });
  return CartItem;
};