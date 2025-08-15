const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('🚀 ~ authenticate ~ decoded:', decoded.id);
    const user = await userService.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = authenticate;
