const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    isAdmin: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
