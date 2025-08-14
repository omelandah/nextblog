const { UUID } = require('mongodb');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  id: UUID,
  title: String,
  body: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
