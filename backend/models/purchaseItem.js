// models/purchaseItem.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseItem extends Model {
    static associate(models) {
      PurchaseItem.belongsTo(models.Purchase, { foreignKey: 'purchaseId' });
      PurchaseItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  PurchaseItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // --- FIX IS HERE ---
    purchaseId: {
      type: DataTypes.UUID, // Changed from INTEGER to UUID
      allowNull: false,
      references: { model: 'purchases', key: 'id' },
      onDelete: 'CASCADE',
    },
    // --- AND HERE ---
    productId: {
      type: DataTypes.UUID, // Changed from INTEGER to UUID
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
    sequelize,
    modelName: 'PurchaseItem',
    tableName: 'purchase_items',
    timestamps: false,
  });

  return PurchaseItem;
};