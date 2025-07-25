const Order = require('../models/Order');
const Product = require('../models/Product');
const Seller = require('../models/Seller');
const Notification = require('../models/Notification');

class DemandTracker {
  constructor() {
    this.demandThreshold = 5; // Minimum sales in 24h to trigger notification
    this.checkInterval = 60 * 60 * 1000; // Check every hour
    this.isRunning = false;
  }

  // Start the demand tracking service
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('🔍 Demand Tracker started');
    
    // Run initial check
    this.checkDemand();
    
    // Set up periodic checks
    this.intervalId = setInterval(() => {
      this.checkDemand();
    }, this.checkInterval);
  }

  // Stop the demand tracking service
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('🛑 Demand Tracker stopped');
  }

  // Check for high-demand products and notify sellers
  async checkDemand() {
    try {
      console.log('📊 Checking product demand...');
      
      // Get orders from last 24 hours
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentOrders = await Order.find({
        createdAt: { $gte: last24Hours }
      });

      // Count sales by product and category
      const productSales = {};
      const categorySales = {};

      recentOrders.forEach(order => {
        order.items.forEach(item => {
          // Count product sales
          if (!productSales[item.name]) {
            productSales[item.name] = {
              count: 0,
              productId: item.id,
              name: item.name
            };
          }
          productSales[item.name].count += item.qty;
        });
      });

      // Get product categories and count by category
      for (const [productName, salesData] of Object.entries(productSales)) {
        try {
          const product = await Product.findOne({ name: productName });
          if (product && product.category) {
            if (!categorySales[product.category]) {
              categorySales[product.category] = {
                count: 0,
                products: []
              };
            }
            categorySales[product.category].count += salesData.count;
            categorySales[product.category].products.push({
              name: productName,
              count: salesData.count
            });
          }
        } catch (err) {
          console.error(`Error processing product ${productName}:`, err);
        }
      }

      // Notify sellers about high-demand categories
      for (const [category, demandData] of Object.entries(categorySales)) {
        if (demandData.count >= this.demandThreshold) {
          await this.notifySellersInCategory(category, demandData);
        }
      }

      // Notify about specific high-demand products
      for (const [productName, salesData] of Object.entries(productSales)) {
        if (salesData.count >= this.demandThreshold) {
          await this.notifyForHighDemandProduct(productName, salesData);
        }
      }

    } catch (error) {
      console.error('❌ Error in demand tracking:', error);
    }
  }

  // Notify sellers in a high-demand category
  async notifySellersInCategory(category, demandData) {
    try {
      // Find sellers in this category
      const sellers = await Seller.find({ category: category });
      
      if (sellers.length === 0) return;

      const topProducts = demandData.products
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map(p => `${p.name} (${p.count} sold)`)
        .join(', ');

      const message = `🔥 High Demand Alert! Your ${category} category is trending! ${demandData.count} items sold in 24h. Top products: ${topProducts}. Consider restocking or adding similar products!`;

      // Check if we already sent this notification recently (within last 6 hours)
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      
      for (const seller of sellers) {
        const existingNotification = await Notification.findOne({
          sellerId: seller._id.toString(),
          type: 'high_demand',
          category: category,
          createdAt: { $gte: sixHoursAgo }
        });

        if (!existingNotification) {
          await Notification.create({
            message,
            type: 'high_demand',
            sellerId: seller._id.toString(),
            sellerName: seller.shopName,
            category: category,
            demandData: {
              salesCount: demandData.count,
              timeFrame: '24h'
            }
          });
          
          console.log(`📢 Demand notification sent to seller: ${seller.shopName} for category: ${category}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error notifying sellers for category ${category}:`, error);
    }
  }

  // Notify about specific high-demand product
  async notifyForHighDemandProduct(productName, salesData) {
    try {
      // Find the product and its associated seller
      const product = await Product.findOne({ name: productName }).populate('sellerId');
      
      if (!product || !product.sellerId) return;

      const message = `🚀 Product Alert! Your product "${productName}" is in high demand! ${salesData.count} units sold in the last 24 hours. Consider increasing inventory or promoting similar items!`;

      // Check if we already sent this notification recently
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      const existingNotification = await Notification.findOne({
        sellerId: product.sellerId._id.toString(),
        type: 'high_demand',
        productName: productName,
        createdAt: { $gte: sixHoursAgo }
      });

      if (!existingNotification) {
        await Notification.create({
          message,
          type: 'high_demand',
          productId: product._id,
          sellerId: product.sellerId._id.toString(),
          sellerName: product.sellerId.shopName,
          productName: productName,
          category: product.category,
          demandData: {
            salesCount: salesData.count,
            timeFrame: '24h'
          }
        });

        console.log(`📢 Product demand notification sent for: ${productName}`);
      }
    } catch (error) {
      console.error(`❌ Error notifying for product ${productName}:`, error);
    }
  }

  // Manually trigger demand check (for testing)
  async triggerCheck() {
    console.log('🔍 Manual demand check triggered');
    await this.checkDemand();
  }

  // Get current demand statistics
  async getDemandStats() {
    try {
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentOrders = await Order.find({
        createdAt: { $gte: last24Hours }
      });

      const stats = {
        totalOrders: recentOrders.length,
        totalItems: 0,
        categorySales: {},
        topProducts: {}
      };

      recentOrders.forEach(order => {
        order.items.forEach(item => {
          stats.totalItems += item.qty;
          
          if (!stats.topProducts[item.name]) {
            stats.topProducts[item.name] = 0;
          }
          stats.topProducts[item.name] += item.qty;
        });
      });

      return stats;
    } catch (error) {
      console.error('❌ Error getting demand stats:', error);
      return null;
    }
  }
}

module.exports = new DemandTracker();
