// controllers/user.controller.js

const User = require('../models/user');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'username', 'bio', 'createdAt', 'updatedAt']
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, bio } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (username) user.username = username;
    if (bio) user.bio = bio;

    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
