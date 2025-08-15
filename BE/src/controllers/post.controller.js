const postService = require('../services/post.service');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = postService.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.user.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = postService.updatePost(
      req.params.id,
      req.body,
      req.user
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.user);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
