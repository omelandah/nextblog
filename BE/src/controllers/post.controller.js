const postService = require('../services/post.service');
const moment = require('moment');
const { TIME_FORMAT } = require('../constants/time');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    const mappedPosts = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      body: post.body,
      date: moment(post.createdAt).format(TIME_FORMAT),
      author: {
        id: post.author._id.toString(),
        username: post.author.username,
      },
    }));
    res.json({ data: mappedPosts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    const mappedPost = {
      id: post._id.toString(),
      title: post.title,
      body: post.body,
      date: moment(post.createdAt).format(TIME_FORMAT),
      author: {
        id: post.author._id.toString(),
        username: post.author.username,
      },
    };
    res.json({ data: mappedPost });
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
    const updatedPost = await postService.updatePost(
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
