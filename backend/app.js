const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
// ... other route imports

const { errorHandler } = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
// ... other app.use for routes

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`EcoFinds backend running on port ${PORT}`);
  });
});

module.exports = app;