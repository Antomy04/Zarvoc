const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      qty: { type: Number, default: 1, min: 1 }
    }
  ],
  amount: { type: Number, required: true },
  paymentId: { type: String },
  paymentStatus: { type: String, default: 'pending' },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
