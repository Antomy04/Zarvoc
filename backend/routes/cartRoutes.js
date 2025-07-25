const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add or update item in cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, name, price, image, qty } = req.body;
    
    if (!userId || !productId || !name || !price) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });
    const item = { id: productId, name, price, image, qty: qty || 1 };

    if (!cart) {
      cart = await Cart.create({ userId, items: [item] });
    } else {
      const existingItem = cart.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        cart.items.push(item);
      }
      await cart.save();
    }
    
    res.json({ message: 'Added to cart successfully!', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart', details: error.message });
  }
});

// Get cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
  }
});

// Delete item from cart
router.put('/remove', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    if (!userId || !itemId) {
      return res.status(400).json({ msg: "Missing userId or itemId" });
    }

    await Cart.updateOne(
      { userId },
      { $pull: { items: { id: itemId } } }
    );
    
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item', details: error.message });
  }
});

// Update quantity of item
router.put('/update', async (req, res) => {
  try {
    const { userId, itemId, qty } = req.body;
    
    if (!userId || !itemId || qty < 1) {
      return res.status(400).json({ msg: "Invalid update request" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    const item = cart.items.find(i => i.id === itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found in cart' });

    item.qty = qty;
    await cart.save();
    
    res.json({ message: 'Quantity updated successfully', item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quantity', details: error.message });
  }
});

// Add this route for better REST compliance
router.delete('/:userId/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    
    await Cart.updateOne(
      { userId },
      { $pull: { items: { id: itemId } } }
    );
    
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item', details: error.message });
  }
});

// Clear entire cart for a user
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteOne({ userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart', details: error.message });
  }
});

module.exports = router;
