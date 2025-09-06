// middleware/validation.js

const Joi = require('joi');

// Middleware factory to validate request body against Joi schema
function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    next();
  };
}

module.exports = { validateRequest };
