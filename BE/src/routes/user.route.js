const express = require('express');
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', authenticate, userController.getUserById);

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;
