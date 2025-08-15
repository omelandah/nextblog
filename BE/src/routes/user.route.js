const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/:id', userController.getUserById);

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;
