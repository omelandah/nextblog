const { UUID } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: UUID,
  username: String,
  email: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
