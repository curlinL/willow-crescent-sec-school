// backend/models/AdminUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpires: { type: Date },
});

// helper to set password
adminUserSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(password, salt);
};

// helper to compare password
adminUserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// helper to generate verification token
adminUserSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = token;
  this.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  return token;
};

module.exports = mongoose.model('AdminUser', adminUserSchema);