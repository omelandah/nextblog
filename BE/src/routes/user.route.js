const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/:id', userController.getUserById);

router.post('/', userController.register);

router.post('/', userController.login);

module.exports = router;
