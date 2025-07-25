const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  shopName: String,
  category: String,
  pincode: String,
  address: String,
  city: String,
  state: String,
  country: String,
  shipping: String,
});

module.exports = mongoose.model('Seller', sellerSchema);