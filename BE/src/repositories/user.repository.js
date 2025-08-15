const User = require('../database/models/User');

const createUser = async (data) => {
  return await User.create(data);
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

const findById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  createUser,
  findByUsername,
  findById,
};
