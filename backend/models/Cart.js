const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    qty: { type: Number, default: 1, min: 1 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
