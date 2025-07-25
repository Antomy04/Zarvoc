// Test script to simulate high-demand scenarios and test notification system
const mongoose = require('mongoose');

// Import models
const Product = require('./models/Product');
const Order = require('./models/Order');
const Seller = require('./models/Seller');
const Notification = require('./models/Notification');
const demandTracker = require('./services/demandTracker');

async function testDemandNotifications() {
  try {
    console.log('🧪 Starting demand notification test...');
    
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerceDB');
    console.log('✅ Connected to MongoDB');

    // Create test sellers
    const testSeller1 = new Seller({
      shopName: 'TechWorld Store',
      category: 'electronic',
      pincode: '110001',
      address: 'Tech Park, Delhi',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      shipping: 'fast'
    });

    const testSeller2 = new Seller({
      shopName: 'Fashion Hub',
      category: 'fashionProducts',
      pincode: '400001',
      address: 'Fashion Street, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      shipping: 'standard'
    });

    await testSeller1.save();
    await testSeller2.save();
    console.log('✅ Test sellers created');

    // Create test products
    const testPhone = new Product({
      category: 'electronic',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with advanced features',
      price: 99999,
      image: '/test-phone.jpg',
      rating: 4.8,
      sellerId: testSeller1._id
    });

    const testShirt = new Product({
      category: 'fashionProducts',
      name: 'Premium Cotton T-Shirt',
      description: 'Comfortable and stylish t-shirt',
      price: 1999,
      image: '/test-shirt.jpg',
      rating: 4.5,
      sellerId: testSeller2._id
    });

    await testPhone.save();
    await testShirt.save();
    console.log('✅ Test products created');

    // Create multiple test orders to simulate high demand
    const orders = [];
    
    // Create 6 orders for iPhone (above threshold of 5)
    for (let i = 0; i < 6; i++) {
      const order = new Order({
        userId: `testuser${i}`,
        items: [{
          id: testPhone._id.toString(),
          name: 'iPhone 15 Pro',
          price: 99999,
          image: '/test-phone.jpg',
          qty: 1
        }],
        amount: 99999,
        paymentId: `payment_test_${i}`,
        paymentStatus: 'paid',
        address: `Test Address ${i}`
      });
      orders.push(order);
    }

    // Create 4 orders for T-Shirt (below threshold)
    for (let i = 0; i < 4; i++) {
      const order = new Order({
        userId: `fashionuser${i}`,
        items: [{
          id: testShirt._id.toString(),
          name: 'Premium Cotton T-Shirt',
          price: 1999,
          image: '/test-shirt.jpg',
          qty: 1
        }],
        amount: 1999,
        paymentId: `payment_fashion_${i}`,
        paymentStatus: 'paid',
        address: `Fashion Address ${i}`
      });
      orders.push(order);
    }

    // Save all orders
    await Order.insertMany(orders);
    console.log('✅ Test orders created (6 iPhones, 4 T-Shirts)');

    // Trigger demand check
    console.log('🔍 Triggering demand check...');
    await demandTracker.triggerCheck();

    // Wait a moment for processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check notifications
    const notifications = await Notification.find({ type: 'high_demand' })
      .sort({ createdAt: -1 });

    console.log('\n📢 Generated Notifications:');
    notifications.forEach((notification, index) => {
      console.log(`${index + 1}. ${notification.message}`);
      console.log(`   Seller: ${notification.sellerName}`);
      console.log(`   Category: ${notification.category}`);
      console.log(`   Sales Count: ${notification.demandData.salesCount}`);
      console.log('   ---');
    });

    // Get demand stats
    const stats = await demandTracker.getDemandStats();
    console.log('\n📊 Current Demand Statistics:');
    console.log(`Total Orders (24h): ${stats.totalOrders}`);
    console.log(`Total Items Sold: ${stats.totalItems}`);
    console.log('Top Products:');
    Object.entries(stats.topProducts).forEach(([product, count]) => {
      console.log(`  - ${product}: ${count} units`);
    });

    console.log('\n✅ Test completed successfully!');
    console.log('\n💡 To test in production:');
    console.log('1. Place orders through the website');
    console.log('2. Check notifications at: GET /api/notifications/high-demand');
    console.log('3. Trigger manual check: POST /api/orders/admin/check-demand');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // Don't close connection, let it stay for the main server
    console.log('\n🔚 Test script completed');
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testDemandNotifications();
}

module.exports = testDemandNotifications;
