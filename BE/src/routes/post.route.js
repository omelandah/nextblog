const express = require('express');
const postController = require('../controllers/post.controller');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, postController.getAllPosts);

router.get('/:id', authenticate, postController.getPostById);

router.post('/', authenticate, postController.createPost);

router.put('/:id', authenticate, postController.updatePost);

router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;
