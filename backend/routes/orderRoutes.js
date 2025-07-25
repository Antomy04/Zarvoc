const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const demandTracker = require('../services/demandTracker');

// Place a new order
router.post('/place', async (req, res) => {
  try {
    const { userId, items, amount, paymentId, address } = req.body;
    if (!userId || !items || !amount) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }
    const order = new Order({
      userId,
      items,
      amount,
      paymentId,
      paymentStatus: paymentId ? 'paid' : 'pending',
      address
    });
    await order.save();
    
    // Trigger demand tracking check after new order
    setTimeout(() => {
      demandTracker.triggerCheck();
    }, 1000); // Small delay to ensure order is saved
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get demand statistics (for admin/debugging)
router.get('/admin/demand-stats', async (req, res) => {
  try {
    const stats = await demandTracker.getDemandStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Manually trigger demand check (for testing)
router.post('/admin/check-demand', async (req, res) => {
  try {
    await demandTracker.triggerCheck();
    res.json({ success: true, message: 'Demand check triggered' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
