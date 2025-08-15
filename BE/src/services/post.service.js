const postRepository = require('../repositories/post.repository');

const getAllPosts = async () => {
  return await postRepository.findAll();
};

const getPostById = async (id) => {
  const post = await postRepository.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  return post;
};

const createPost = async (postData, userId) => {
  return await postRepository.create({ ...postData, author: userId });
};

const updatePost = async (id, postData, user) => {
  const post = postRepository.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  if (post.author._id.toString() !== user.id && !user.isAdmin) {
    throw new Error('Not authorized to update this post');
  }

  return await postRepository.update(id, postData);
};

const deletePost = async (id, postData, user) => {
  const post = postRepository.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  if (post.author._id.toString() !== user.id && !user.isAdmin) {
    throw new Error('Not authorized to delete this post');
  }

  return await postRepository.deleteById(id);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
