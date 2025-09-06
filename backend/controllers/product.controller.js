// controllers/product.controller.js

const Product = require('../models/product');
const Category = require('../models/category');

// Create a new product listing
exports.createProduct = async (req, res, next) => {
  try {
    const { title, description, categoryId, price, imageUrl } = req.body;
    if (!title || !categoryId || price === undefined) {
      return res.status(400).json({ error: 'Title, categoryId and price are required' });
    }

    // Optional: Verify category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const product = await Product.create({
      userId: req.user.id,
      title,
      description,
      categoryId,
      price,
      imageUrl,
    });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

// Get products with optional filtering by category and search by title keyword
exports.listProducts = async (req, res, next) => {
  try {
    const { category, q, limit = 20, offset = 0 } = req.query;
    const where = {};

    if (category) {
      where.categoryId = category;
    }

    if (q) {
      where.title = { 
        [Product.sequelize.Op.iLike]: `%${q}%`  // Case-insensitive search for PostgreSQL
      };
    }

    const products = await Product.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [{ model: Category, attributes: ['id', 'name'] }],
    });

    res.json({ count: products.count, products: products.rows });
  } catch (error) {
    next(error);
  }
};

// Get a specific product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }],
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// Update an existing product (only owner can update)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: Not product owner' });
    }

    const { title, description, categoryId, price, imageUrl } = req.body;

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) return res.status(400).json({ error: 'Invalid category' });
      product.categoryId = categoryId;
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;

    await product.save();
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// Delete a product (only owner can delete)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: Not product owner' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
