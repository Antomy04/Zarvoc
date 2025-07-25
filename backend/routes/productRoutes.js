/* eslint-env node */
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Notification = require('../models/Notification');

router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  try {
    const products = await Product.find({
      name: { $regex: q, $options: 'i' } // 'i' for case-insensitive
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products (general route)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get products by seller ID (NEW ROUTE - must come before /:category)
router.get('/seller/:sellerId', async (req, res) => {
  try {
    console.log('Fetching products for seller:', req.params.sellerId);
    const products = await Product.find({ sellerId: req.params.sellerId });
    console.log('Found products for seller:', products.length);
    res.json(products);
  } catch (err) {
    console.error('Error fetching seller products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products by category (RESTORED ORIGINAL FUNCTIONALITY)
router.get('/:category', async (req, res) => {
  console.log('Received request for category:', req.params.category);
  try {
    // Case-insensitive and partial match for category
    const products = await Product.find({ category: { $regex: req.params.category, $options: 'i' } });
    console.log('Found products:', products.length);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    // Create notification for new product
    const notification = new Notification({
      message: `🆕 New product added: "${product.name}" in ${product.category} category!`,
      type: 'new_product',
      productId: product._id,
      sellerId: product.sellerId,
      productName: product.name
    });
    
    await notification.save();
    console.log('✅ Product added and notification created:', product.name);
    
    res.json(product);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Delete a product (with seller verification)
router.delete('/:id', async (req, res) => {
  try {
    const { sellerId } = req.body;
    
    if (sellerId) {
      // If sellerId is provided, verify ownership
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Only check ownership if product has sellerId field
      if (product.sellerId && product.sellerId.toString() !== sellerId) {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own products' });
      }
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

// Update a product (with seller verification)
router.put('/:id', async (req, res) => {
  try {
    const { sellerId, ...updateData } = req.body;
    const productId = req.params.id;
    
    // First check if product exists and verify ownership
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Verify seller ownership if sellerId is provided
    if (sellerId && product.sellerId && product.sellerId.toString() !== sellerId) {
      return res.status(403).json({ message: 'Unauthorized: You can only update your own products' });
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    
    // Create notification for price update if price was changed
    if (updateData.price && updateData.price !== product.price) {
      const notification = new Notification({
        message: `💰 Price updated for "${updatedProduct.name}" - New price: ₹${updateData.price} (was ₹${product.price})`,
        type: 'price_update',
        productId: updatedProduct._id,
        sellerId: updatedProduct.sellerId,
        productName: updatedProduct.name
      });
      
      await notification.save();
      console.log('💰 Price update notification created for:', updatedProduct.name);
    }
    
    console.log('✅ Product updated successfully:', updatedProduct.name, 'New price:', updatedProduct.price);
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});

// AI Pricing Analysis Route
router.post('/analyze-pricing', async (req, res) => {
  try {
    const { productName, category, currentPrice, sellerId } = req.body;
    
    console.log('🤖 AI Pricing Analysis Request:', { productName, category, currentPrice, sellerId });
    
    // Find competitor products (same category, similar name, different seller)
    const competitors = await Product.find({
      category: category,
      $and: [
        {
          $or: [
            { name: { $regex: productName, $options: 'i' } },
            { name: { $regex: productName.split(' ')[0], $options: 'i' } },
            { description: { $regex: productName, $options: 'i' } }
          ]
        },
        { sellerId: { $ne: sellerId } }, // Exclude same seller
        { price: { $exists: true, $gt: 0 } } // Valid price
      ]
    }).limit(20).select('name description price sellerId category');
    
    console.log(`🔍 Found ${competitors.length} competitor products`);
    
    // AI Analysis Logic
    let analysis = {
      competitorCount: competitors.length,
      priceAnalysis: null,
      recommendation: null,
      marketPosition: null
    };
    
    if (competitors.length > 0) {
      const prices = competitors.map(p => p.price);
      const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      analysis.priceAnalysis = {
        average: Math.round(avgPrice),
        minimum: minPrice,
        maximum: maxPrice,
        currentPrice: currentPrice
      };
      
      // Determine market position
      if (currentPrice > maxPrice) {
        analysis.marketPosition = 'HIGHEST';
      } else if (currentPrice < minPrice) {
        analysis.marketPosition = 'LOWEST';
      } else if (currentPrice > avgPrice) {
        analysis.marketPosition = 'ABOVE_AVERAGE';
      } else if (currentPrice < avgPrice) {
        analysis.marketPosition = 'BELOW_AVERAGE';
      } else {
        analysis.marketPosition = 'AVERAGE';
      }
      
      // AI Recommendation Logic
      const priceRatio = currentPrice / avgPrice;
      
      if (priceRatio > 1.2) {
        analysis.recommendation = {
          action: 'REDUCE_SIGNIFICANTLY',
          suggestedPrice: Math.round(avgPrice * 0.95),
          confidence: 'HIGH',
          reason: 'Your price is significantly higher than competitors. Reducing price will improve competitiveness.'
        };
      } else if (priceRatio > 1.1) {
        analysis.recommendation = {
          action: 'REDUCE_SLIGHTLY',
          suggestedPrice: Math.round(avgPrice),
          confidence: 'MEDIUM',
          reason: 'Your price is above market average. Consider matching average price for better sales.'
        };
      } else if (priceRatio < 0.8) {
        analysis.recommendation = {
          action: 'INCREASE_SIGNIFICANTLY',
          suggestedPrice: Math.round(minPrice * 0.98),
          confidence: 'HIGH',
          reason: 'Your price is much lower than competitors. You can increase price while staying competitive.'
        };
      } else if (priceRatio < 0.9) {
        analysis.recommendation = {
          action: 'INCREASE_SLIGHTLY',
          suggestedPrice: Math.round(avgPrice * 0.95),
          confidence: 'MEDIUM',
          reason: 'Your price is below average. Small increase possible without losing competitiveness.'
        };
      } else {
        analysis.recommendation = {
          action: 'MAINTAIN',
          suggestedPrice: currentPrice,
          confidence: 'HIGH',
          reason: 'Your price is well-positioned in the market. Current pricing strategy is optimal.'
        };
      }
    } else {
      analysis.recommendation = {
        action: 'NO_COMPETITORS',
        suggestedPrice: currentPrice,
        confidence: 'LOW',
        reason: 'No direct competitors found. You have pricing flexibility but monitor market response.'
      };
    }
    
    res.json({
      success: true,
      competitors: competitors.map(comp => ({
        name: comp.name,
        price: comp.price,
        category: comp.category
      })),
      analysis: analysis,
      aiInsights: {
        marketTrend: competitors.length > 5 ? 'COMPETITIVE' : competitors.length > 0 ? 'MODERATE' : 'MONOPOLY',
        priceSpread: competitors.length > 0 ? Math.max(...competitors.map(c => c.price)) - Math.min(...competitors.map(c => c.price)) : 0,
        recommendationStrength: analysis.recommendation?.confidence || 'LOW'
      }
    });
    
  } catch (err) {
    console.error('❌ Error in AI pricing analysis:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to analyze pricing',
      error: err.message 
    });
  }
});

module.exports = router;