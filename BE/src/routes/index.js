const express = require('express');
const blogRoute = require('./blog.route');
const userRoute = require('./user.route');

const router = express.Router();

router.use('/blog', blogRoute);

router.use('/user', userRoute);

module.exports = router;
