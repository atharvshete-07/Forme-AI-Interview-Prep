const mongoose = require('mongoose');
require('dotenv').config();

const databaseconnection = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not configured');
  }

  await mongoose.connect(uri);
  console.log('Connected to the database');
};

module.exports = databaseconnection;
