require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

// Models
const User = require('./models/User');
const Contact = require('./models/Contact');
const Product = require('./models/Product'); // Add Product model

// Services
const demandTracker = require('./services/demandTracker');

// Routes
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// OpenAI Chat Proxy Endpoint
const fetch = require('node-fetch');
app.post('/api/chat', async (req, res) => {
  const { userMessage } = req.body;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You are Dubbo, a friendly shopping assistant for Zarvoc. Answer user questions naturally and helpfully. Do not suggest products unless specifically asked." },
          { role: 'user', content: userMessage }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 200
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that." });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ reply: "Sorry, something went wrong. Please try again later." });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Auth Routes
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ msg: "Signup Successful" });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ msg: "Server error during signup" });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    res.json({ msg: "Signin successful", userId: user._id });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ msg: "Server error during signin" });
  }
});

// Contact Route
app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, msg: "Thank you for contacting us" });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, msg: "Server error. Please try again." });
  }
});

// Direct products route for seller dashboard
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Failed to delete product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Other Routes
app.use('/api/products', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve frontend static files
// Bhai, yahan pe frontend ke static files serve ho rahe hain
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  
  // Start the demand tracking service
  demandTracker.start();
});