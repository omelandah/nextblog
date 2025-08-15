const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

const registerUser = async ({ username, password, email }) => {
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser({
    username,
    password: hashedPassword,
    email,
  });
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

  return user;
};

const getUserById = async (id) => {
  return await userRepository.findById(id);
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
