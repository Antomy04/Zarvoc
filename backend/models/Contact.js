const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    quality_rating: Number,
    service_rating: Number,
    delivery_rating: Number,
    address: String,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact',contactSchema);