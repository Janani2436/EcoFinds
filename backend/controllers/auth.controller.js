const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // This line is crucial
require('dotenv').config();

// In backend/controllers/auth.controller.js

exports.register = async (req, res, next) => {
  // --- START: New Logging Code ---
  console.log('--- Register Request Received ---');
  console.log('Request Body:', req.body);
  // --- END: New Logging Code ---

  try {
    const { name, email, password } = req.body;

    // --- START: New Logging Code ---
    if (!name || !email || !password) {
      console.error('Validation Failed: Missing name, email, or password.');
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    console.log(`Data received: Name=${name}, Email=${email}`);
    // --- END: New Logging Code ---

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Password hashed successfully.');

    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log('User successfully created in database with ID:', newUser.id);

    res.status(201).json({ message: 'User created successfully!', userId: newUser.id });
    console.log('--- Register Request Successfully Completed ---');

  } catch (error) {
    // --- START: New Logging Code ---
    console.error('!!! An error occurred during registration !!!');
    console.error(error); // This will print the full Sequelize error object
    // --- END: New Logging Code ---
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Auth failed: User not found.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Auth failed: Wrong password.' });
    }
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    next(error);
  }
};
// Add this function to backend/controllers/auth.controller.js

const { User } = require('../models');

// ... (keep your existing register, login, and getUserProfile functions)

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is a required field.' });
    }

    const user = await User.findByPk(req.userData.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.name = name;
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};