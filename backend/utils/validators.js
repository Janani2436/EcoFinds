// utils/validators.js

const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  username: Joi.string().min(3).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const productSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('').optional(),
  categoryId: Joi.number().integer().required(),
  price: Joi.number().precision(2).min(0).required(),
  imageUrl: Joi.string().uri().optional(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  bio: Joi.string().allow('').optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  updateUserSchema,
};
