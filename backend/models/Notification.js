const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['new_product', 'price_update', 'promotion', 'system', 'high_demand'],
    default: 'new_product'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  sellerId: {
    type: String
  },
  sellerName: {
    type: String
  },
  productName: {
    type: String
  },
  category: {
    type: String
  },
  demandData: {
    salesCount: { type: Number, default: 0 },
    timeFrame: { type: String, default: '24h' }
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-delete notifications older than 30 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('Notification', notificationSchema);
