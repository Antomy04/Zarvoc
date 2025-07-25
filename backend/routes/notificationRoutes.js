const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications (latest first)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 notifications
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get notifications for specific seller
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      sellerId: req.params.sellerId 
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching seller notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get high demand notifications only
router.get('/high-demand', async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      type: 'high_demand' 
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching high demand notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear all notifications
router.delete('/clear', async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ message: 'All notifications cleared' });
  } catch (err) {
    console.error('Error clearing notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new notification (used internally)
router.post('/', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
