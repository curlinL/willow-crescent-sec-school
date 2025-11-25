// Usage: node scripts/createAdmin.js <username> <password>
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const AdminUser = require('../models/AdminUser');

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error('Please provide both <username> and <password>.');
  process.exit(1);
}

const createAdmin = async () => {
  await connectDB();

  let admin = await AdminUser.findOne({ username });
  if (!admin) {
    admin = new AdminUser({ username });
  }

  await admin.setPassword(password);
  await admin.save();

  console.log(`Admin account for "${username}" is ready.`);
  await mongoose.connection.close();
};

createAdmin().catch(async (err) => {
  console.error('Failed to create admin user', err);
  await mongoose.connection.close();
  process.exit(1);
});
