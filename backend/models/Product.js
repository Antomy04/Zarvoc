const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  rating: Number,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: false // Made optional to support existing products
  },
  amount: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Product', productSchema);
