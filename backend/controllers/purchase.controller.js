// controllers/purchase.controller.js

const Purchase = require('../models/purchase');
const PurchaseItem = require('../models/purchaseItem');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const sequelize = require('../config/db');

exports.checkout = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;

    // Get all cart items for user with product details and price
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product }],
      transaction: t,
      lock: true,
    });

    if (!cartItems.length) {
      await t.rollback();
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total price
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);

    // Create new purchase record
    const purchase = await Purchase.create(
      {
        userId,
        total,
      },
      { transaction: t }
    );

    // Create purchase items records
    const purchaseItemsData = cartItems.map(item => ({
      purchaseId: purchase.id,
      productId: item.productId,
      price: item.Product.price,
      quantity: item.quantity,
    }));

    await PurchaseItem.bulkCreate(purchaseItemsData, { transaction: t });

    // Clear user's cart items
    await CartItem.destroy({ where: { userId }, transaction: t });

    await t.commit();

    res.status(201).json({ purchaseId: purchase.id, total, message: 'Purchase completed successfully' });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.getPurchaseHistory = async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: PurchaseItem,
          include: [{ model: Product, attributes: ['id', 'title', 'imageUrl'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ purchases });
  } catch (error) {
    next(error);
  }
};
