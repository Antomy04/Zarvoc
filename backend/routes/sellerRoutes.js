const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// Register a seller
router.post('/', async (req, res) => {
  const seller = new Seller(req.body);
  await seller.save();
  res.json({ message: 'Seller registered', sellerId: seller._id });
});

module.exports = router;