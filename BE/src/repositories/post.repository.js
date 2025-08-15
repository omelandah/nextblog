const Post = require('../database/models/Post');

const findAll = async () => {
  return await Post.find().populate('author', 'username email');
};

const findById = async (id) => {
  return await Post.findById(id).populate('author', 'username email');
};

const create = async (data) => {
  return await Post.create(data);
};

const update = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
