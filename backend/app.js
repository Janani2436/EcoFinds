// app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const purchaseRoutes = require('./routes/purchase.routes');

const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security, CORS, and JSON parsing middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json()); // Important: JSON parser before logging and routes

// Debugging middleware to log headers and parsed body of requests
app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use(morgan('dev')); // HTTP request logger

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchaseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Central error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EcoFinds backend running on port ${PORT}`);
});

module.exports = app;
