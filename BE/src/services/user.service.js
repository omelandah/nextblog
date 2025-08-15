const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const registerUser = async ({ username, password, email }) => {
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    username,
    password: hashedPassword,
    email,
  });
  return { id: newUser._id, ...newUser };
};

const loginUser = async ({ username, password }) => {
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  };
};

const getUserById = async (id) => {
  return await userRepository.findById(id);
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
