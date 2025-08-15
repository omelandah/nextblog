const express = require('express');
const postRoute = require('./post.route');
const userRoute = require('./user.route');

const router = express.Router();

router.use('/post', postRoute);

router.use('/user', userRoute);

module.exports = router;
