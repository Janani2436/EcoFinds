// controllers/cart.controller.js

const CartItem = require('../models/cartItem');
const Product = require('../models/product');

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Product ID and positive quantity required' });
    }

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the product is already in cart, update quantity if so
    let cartItem = await CartItem.findOne({ where: { userId: req.user.id, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ userId: req.user.id, productId, quantity });
    }

    res.status(201).json({ cartItem });
  } catch (error) {
    next(error);
  }
};

exports.viewCart = async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'title', 'price', 'imageUrl'] }],
    });
    res.json({ cartItems });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
