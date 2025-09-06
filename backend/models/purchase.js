'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      Purchase.hasMany(models.PurchaseItem, { foreignKey: 'purchaseId' });
    }
  }
  Purchase.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  }, {
    sequelize,
    modelName: 'Purchase',
    timestamps: true,
    // --- ADD THIS LINE ---
    tableName: 'purchases',
  });
  return Purchase;
};