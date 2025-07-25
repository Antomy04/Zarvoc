import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDisplay } from '../contexts/ProductDisplayContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', message: "Hello there! I'm Dubbo, your friendly shopping buddy! 😊✨ I'm here to help you discover amazing products and navigate through Zarvoc with ease. What can I help you find today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isContinuousListening, setIsContinuousListening] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const navigate = useNavigate();
  const { updateProductDisplay } = useProductDisplay();
  const recognition = useRef(null);
  const messagesEndRef = useRef(null);
  const continuousListeningRef = useRef(false);

  // Update ref when state changes
  useEffect(() => {
    continuousListeningRef.current = isContinuousListening;
  }, [isContinuousListening]);

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      try {
        recognition.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
      }
    }
  };

  const toggleContinuousListening = () => {
    if (isContinuousListening) {
      // Stop continuous listening
      setIsContinuousListening(false);
      setIsListening(false);
      if (recognition.current) {
        recognition.current.abort();
      }
    } else {
      // Start continuous listening
      setIsContinuousListening(true);
      startListening();
    }
  };

  const stopListening = () => {
    setIsContinuousListening(false);
    setIsListening(false);
    if (recognition.current) {
      recognition.current.abort();
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleUserMessage(transcript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
        // If continuous listening is enabled, restart recognition
        if (continuousListeningRef.current) {
          setTimeout(() => {
            if (continuousListeningRef.current) {
              startListening();
            }
          }, 1000); // Increased delay for better stability
        }
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (continuousListeningRef.current && event.error !== 'aborted') {
          setTimeout(() => {
            if (continuousListeningRef.current) {
              startListening();
            }
          }, 2000); // Longer delay after error
        }
      };
    }
  }, []); // Empty dependency array since we use refs

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup effect to stop listening when component unmounts
  useEffect(() => {
    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
      setIsContinuousListening(false);
      setIsListening(false);
    };
  }, []);

  // Robot movement animation
  const moveRobot = (targetX, targetY) => {
    setIsMoving(true);
    setCurrentAnimation('walking');
    setRobotPosition({ x: targetX, y: targetY });
    setTimeout(() => {
      setIsMoving(false);
      setCurrentAnimation('idle');
    }, 1000);
  };

  // AI Response logic with improved command understanding
  const getAIResponse = async (userMessage) => {
    const message = userMessage.toLowerCase();

    // Product search
    if (message.includes('search for') || message.includes('find') || message.includes('looking for') ||  message.includes('show me')) {
      const searchTerm = message.replace(/search for|find|looking for|show me|\./gi, '').trim();
       if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      return "Here are some products that you asked for"
    } else {
      return "what can i show you"
    }
  }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('dubbo')) {
      moveRobot(30, 30);
      return "Hey there! 👋 I'm Dubbo, and I'm so excited to help you today! What amazing products are you looking for?";
    }
    
    // Navigation commands with similar variations
    if (message.includes('home') || message.includes('main page') || message.includes('homepage') || message.includes('go back') || message.includes('start page')) {
      navigate('/');
      moveRobot(20, 20);
      return "Taking you back to the home page! 🏠 Let's explore some amazing products together!";
    }
    
    if (message.includes('cart') || message.includes('shopping cart') || message.includes('my cart') || message.includes('basket') || message.includes('shopping bag')) {
      navigate('/cart');
      moveRobot(80, 20);
      return "Opening your shopping cart! 🛒 Let's see what treasures you've collected!";
    }
    
    if (message.includes('about') || message.includes('about us') || message.includes('company info') || message.includes('who are you') || message.includes('zarvoc info')) {
      navigate('/about');
      moveRobot(50, 20);
      return "Let me show you more about Zarvoc! ℹ️ We're passionate about bringing you the best products!";
    }
    
    if (message.includes('contact') || message.includes('contact us') || message.includes('get in touch') || message.includes('support') || message.includes('help desk')) {
      window.location.href = '/contact.html';
      moveRobot(80, 80);
      return "Opening our contact page for you! 📞 Our team would love to hear from you!";
    }

    if (message.includes('checkout') || message.includes('place order') || message.includes('buy now') || message.includes('purchase') || message.includes('pay now')) {
      navigate('/checkout');
      moveRobot(60, 80);
      return "Let's complete your purchase! 💳✨ I'm excited to help you get these amazing products!";
    }

    // Product recommendations with improved command understanding
    if (message.includes('top products') || message.includes('best products') || message.includes('popular products') || 
        message.includes('bestsellers') || message.includes('top picks') || message.includes('recommended') || 
        message.includes('trending') || message.includes('most loved')) {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const products = await response.json();
          const topProducts = products.slice(0, 4).map(product => ({
            name: product.name,
            category: product.category || 'Product',
            rating: 4.5 + Math.random() * 0.5,
            price: product.price ? `₹${product.price}` : "₹999",
            image: product.image || '/api/placeholder/200/200'
          }));
          // Only update main display, not chat
          updateProductDisplay(topProducts, "🌟 Dubbo's Top Product Recommendations");
          moveRobot(30, 60);
          return "Wow! 🌟 These are absolutely our most popular products that customers can't stop raving about! I think you'll love them too! Check out the main page to see them in detail!";
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      
      // Fallback to static data
      const topProducts = [
        { name: "Wireless Headphones", category: "Electronics", rating: 4.8, price: "₹2,999", image: '/api/placeholder/200/200' },
        { name: "Smart Watch", category: "Electronics", rating: 4.7, price: "₹8,999", image: '/api/placeholder/200/200' },
        { name: "Cotton T-Shirt", category: "Fashion", rating: 4.6, price: "₹599", image: '/api/placeholder/200/200' },
        { name: "Running Shoes", category: "Fashion", rating: 4.9, price: "₹3,499", image: '/api/placeholder/200/200' }
      ];
      setSuggestions(topProducts);
      setShowSuggestions(true);
      // Update main display
      updateProductDisplay(topProducts, "🌟 Dubbo's Top Product Recommendations");
      moveRobot(30, 60);
      return "Wow! 🌟 These are absolutely our most popular products that customers can't stop raving about! I think you'll love them too! Check out the main page to see them in detail!";
    }
    
    // Fashion category with navigation
    if (message.includes('latest fashion') || message.includes('fashion trends') || message.includes('trendy clothes') || 
        message.includes('clothing') || message.includes('clothes') || message.includes('apparel') || 
        message.includes('outfit') || message.includes('style') || message.includes('dress') || message.includes('shirt')) {
      
      // Navigate to fashion category page
      navigate('/category?cat=fashionProducts');
      moveRobot(70, 40);
      
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const products = await response.json();
          const fashionItems = products
            .filter(product => product.category && product.category.toLowerCase().includes('fashion'))
            .slice(0, 4)
            .map(product => ({
              name: product.name,
              category: 'Fashion',
              rating: 4.4 + Math.random() * 0.6,
              price: product.price ? `₹${product.price}` : "₹999"
            }));
          
          if (fashionItems.length > 0) {
          // Only update main display, not chat
          updateProductDisplay(fashionItems, "👗 Dubbo's Fashion Picks");
          return "Oh my! 👗✨ You have amazing taste! I'm taking you to our fashion category page where you can see all our stunning fashion pieces that are totally on-trend right now! Check the main page for my picks!";
          }
        }
      } catch (error) {
        console.error('Error fetching fashion products:', error);
      }
      
      // Fallback to static data
      const fashionItems = [
        { name: "Trendy Denim Jacket", category: "Fashion", rating: 4.5, price: "₹1,999" },
        { name: "Designer Handbag", category: "Fashion", rating: 4.7, price: "₹2,499" },
        { name: "Stylish Sunglasses", category: "Fashion", rating: 4.4, price: "₹899" },
        { name: "Fashion Sneakers", category: "Fashion", rating: 4.8, price: "₹2,999" }
      ];
      setSuggestions(fashionItems);
      setShowSuggestions(true);
      return "Oh my! 👗✨ You have amazing taste! I'm taking you to our fashion category page where you can see all our stunning fashion pieces that are totally on-trend right now!";
    }
    
    // Toys category with navigation
    if (message.includes('toy') || message.includes('daughter') || message.includes('son') || message.includes('gift') || 
        message.includes('kids') || message.includes('children') || message.includes('child') || message.includes('baby') ||
        message.includes('toddler') || message.includes('young one') || message.includes('little one') || message.includes('present')) {
      
      // Navigate to children toys category page
      navigate('/category?cat=childrenToysProducts');
      moveRobot(40, 70);
      
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const products = await response.json();
          const toys = products
            .filter(product => product.category && product.category.toLowerCase().includes('toy'))
            .slice(0, 4)
            .map(product => ({
              name: product.name,
              category: 'Toys',
              rating: 4.5 + Math.random() * 0.5,
              price: product.price ? `₹${product.price}` : "₹799"
            }));
          
          if (toys.length > 0) {
          // Only update main display, not chat
          updateProductDisplay(toys, "🎁 Dubbo's Perfect Gifts for Children");
          return "Aww, how sweet! 🎁🧸 I just love helping find perfect gifts for little ones! I'm taking you to our children's toys category page where you can see all the amazing toys that will definitely bring huge smiles and endless joy! Look at the main page too - I've displayed them there for you!";
          }
        }
      } catch (error) {
        console.error('Error fetching toys:', error);
      }
      
      // Fallback to static data
      const toys = [
        { name: "Educational Building Blocks", category: "Toys", rating: 4.9, price: "₹1,299", image: '/api/placeholder/200/200' },
        { name: "Interactive Doll", category: "Toys", rating: 4.6, price: "₹999", image: '/api/placeholder/200/200' },
        { name: "Art & Craft Kit", category: "Toys", rating: 4.7, price: "₹699", image: '/api/placeholder/200/200' },
        { name: "Musical Keyboard", category: "Toys", rating: 4.5, price: "₹1,599", image: '/api/placeholder/200/200' }
      ];
      setSuggestions(toys);
      setShowSuggestions(true);
      // Update main display with toy suggestions
      updateProductDisplay(toys, "🎁 Dubbo's Perfect Gifts for Children");
      return "Aww, how sweet! 🎁🧸 I just love helping find perfect gifts for little ones! I'm taking you to our children's toys category page where you can see all the amazing toys that will definitely bring huge smiles and endless joy! Look at the main page too - I've displayed them there for you!";
    }
    
    // Electronics category with navigation
    if (message.includes('electronics') || message.includes('gadgets') || message.includes('phone') || message.includes('laptop') ||
        message.includes('mobile') || message.includes('smartphone') || message.includes('computer') || message.includes('tablet') ||
        message.includes('tech') || message.includes('device') || message.includes('electronic') || message.includes('digital')) {
      
      // Navigate to electronics category page
      navigate('/category?cat=electronic');
      moveRobot(60, 30);
      
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const products = await response.json();
          const electronics = products
            .filter(product => product.category && product.category.toLowerCase().includes('electronic'))
            .slice(0, 4)
            .map(product => ({
              name: product.name,
              category: 'Electronics',
              rating: 4.6 + Math.random() * 0.4,
              price: product.price ? `₹${product.price}` : "₹9,999"
            }));
          
          if (electronics.length > 0) {
          // Only update main display, not chat
          updateProductDisplay(electronics, "📱 Dubbo's Top Electronics & Gadgets");
          return "Ooh, tech lover! 📱💻✨ You've got excellent taste! I'm taking you to our electronics category page where you can explore all our cutting-edge gadgets and super popular tech items! Also check the main page - I've displayed them beautifully for you!";
          }
        }
      } catch (error) {
        console.error('Error fetching electronics:', error);
      }
      
      // Fallback to static data
      const electronics = [
        { name: "Smartphone", category: "Electronics", rating: 4.8, price: "₹15,999", image: '/api/placeholder/200/200' },
        { name: "Laptop", category: "Electronics", rating: 4.7, price: "₹45,999", image: '/api/placeholder/200/200' },
        { name: "Bluetooth Speaker", category: "Electronics", rating: 4.6, price: "₹1,999", image: '/api/placeholder/200/200' },
        { name: "Gaming Console", category: "Electronics", rating: 4.9, price: "₹35,999", image: '/api/placeholder/200/200' }
      ];
      setSuggestions(electronics);
      setShowSuggestions(true);
      // Update main display with electronics
      updateProductDisplay(electronics, "📱 Dubbo's Top Electronics & Gadgets");
      return "Ooh, tech lover! 📱💻✨ You've got excellent taste! I'm taking you to our electronics category page where you can explore all our cutting-edge gadgets and super popular tech items! Also check the main page - I've displayed them beautifully for you!";
    }

    // Additional category searches with navigation
    if (message.includes('kitchen') || message.includes('cooking') || message.includes('kitchenware') || 
        message.includes('cookware') || message.includes('appliances')) {
      navigate('/category?cat=kitchenProducts');
      moveRobot(45, 65);
      return "Ooh, a fellow cooking enthusiast! 🍳👨‍🍳 I'm taking you to our kitchen category page where you can find amazing kitchen essentials and cooking appliances! Let me show you some fantastic options!";
    }

    if (message.includes('cosmetic') || message.includes('beauty') || message.includes('makeup') || 
        message.includes('skincare') || message.includes('lipstick') || message.includes('foundation')) {
      navigate('/category?cat=cosmeticProducts');
      moveRobot(35, 45);
      return "You're going to love this! 💄✨ I'm taking you to our cosmetics category page where you can explore all our beautiful makeup and skincare products! Time to glow up! 🌟";
    }

    if (message.includes('furniture') || message.includes('chair') || message.includes('table') || 
        message.includes('sofa') || message.includes('home decor')) {
      navigate('/category?cat=furnitureProducts');
      moveRobot(55, 25);
      return "Perfect choice for home makeover! 🏠🪑 I'm taking you to our furniture category page where you can find amazing pieces to make your home beautiful and comfortable!";
    }

    if (message.includes('food items') || message.includes('grocery') || message.includes('snacks') || 
        message.includes('eating') || message.includes('recipe')) {
      navigate('/category?cat=foodProducts');
      moveRobot(65, 55);
      return "Yummy! 🍽️😋 I'm taking you to our food products category page where you can find delicious snacks and grocery items! Let's satisfy those taste buds!";
    }

    if (message.includes('sports') || message.includes('fitness') || message.includes('exercise') || 
        message.includes('workout') || message.includes('gym') || message.includes('athletic')) {
      navigate('/category?cat=sportsProducts');
      moveRobot(70, 60);
      return "Awesome! 💪🏃‍♀️ I'm taking you to our sports category page where you can find the perfect sports and fitness equipment to reach your goals! Stay active and healthy!";
    }

    // Product search by name
    if (message.includes('search for') || message.includes('find product') || message.includes('looking for product')) {
      const searchTerm = message.replace(/search for|find product|looking for product|show me|find me|i want/gi, '').trim();
      if (searchTerm) {
        try {
          const response = await fetch('http://localhost:5000/products');
          if (response.ok) {
            const products = await response.json();
            const matchingProducts = products
              .filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
              )
              .slice(0, 4)
              .map(product => ({
                name: product.name,
                category: product.category || 'Product',
                rating: 4.0 + Math.random() * 1.0,
                price: product.price ? `₹${product.price}` : "₹999",
                image: product.image || '/api/placeholder/200/200'
              }));
            if (matchingProducts.length > 0) {
              // Only update main display, not chat
              updateProductDisplay(matchingProducts, `🔍 Results for "${searchTerm}"`);
              moveRobot(40, 50);
              return `Great choice! 🔍✨ I found some amazing products related to "${searchTerm}"! Check the main page for your results.`;
            } else {
              moveRobot(40, 50);
              return `Hmm, I couldn't find exact matches for "${searchTerm}" 🤔 But don't worry! Try asking for categories like 'electronics', 'fashion', 'toys', or 'kitchen items' - I'd love to help you discover something amazing! 😊`;
            }
          }
        } catch (error) {
          console.error('Error searching products:', error);
        }
      }
      moveRobot(40, 50);
      return "I'd love to help you search! 🔍 Try saying something like 'search for iPhone' or 'find me running shoes' and I'll show you the best matches! What are you looking for?";
    }

    // Shopping assistance with enhanced understanding
    if (message.includes('where is') ||  message.includes('need') || 
        message.includes('want') || message.includes('browse')) {
      navigate('/');
      moveRobot(50, 30);
      return "Perfect! 🔍✨ Let me take you to our main page where you can easily search and browse through all our amazing products! What specific item are you hoping to find?";
    }

    if (message.includes('price') || message.includes('cost') || message.includes('cheap') || message.includes('budget') ||
        message.includes('affordable') || message.includes('deal') || message.includes('discount') || message.includes('sale') ||
        message.includes('low price') || message.includes('inexpensive')) {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const products = await response.json();
          const budgetProducts = products
            .filter(product => product.price && product.price < 1000)
            .slice(0, 4)
            .map(product => ({
              name: product.name,
              category: product.category || 'Product',
              rating: 4.3 + Math.random() * 0.7,
              price: `₹${product.price}`
            }));
          
          if (budgetProducts.length > 0) {
            setSuggestions(budgetProducts);
            setShowSuggestions(true);
            moveRobot(25, 45);
            return "Yay! 💰🎉 I love helping you save money! These are absolutely fantastic products that won't break the bank - great quality at amazing prices!";
          }
        }
      } catch (error) {
        console.error('Error fetching budget products:', error);
      }
      
      moveRobot(25, 45);
      return "You're so smart to look for great deals! 💰🎉 Let me show you our most amazing budget-friendly products that offer incredible value!";
    }

    // Help and guidance with more personality
    if (message.includes('help') || message.includes('how') || message.includes('guide') || message.includes('what can you do') ||
        message.includes('commands') || message.includes('options') || message.includes('assist')) {
      moveRobot(50, 50);
      return "Oh, I'm so glad you asked! 😊💫 I'm Dubbo, and I absolutely LOVE helping you shop! Here's what I can do:\n\n✨ Show you our top products and bestsellers\n👗 Find latest fashion and trendy clothes\n🎁 Suggest perfect toys and gifts for kids\n📱 Display cool electronics and gadgets\n🏠 Navigate you to different pages (home, cart, about)\n💰 Find budget-friendly deals and discounts\n🔍 Help you search for specific items\n\n🎤 Voice Controls:\n• 🎤 Click microphone for single voice command\n• 🎙️ Click the continuous listening button to keep me listening until you turn it off!\n\nJust chat with me naturally - I understand lots of different ways to ask for things! What sounds interesting to you?";
    }

    // Default responses with more personality
    const defaultResponses = [
      "Hey there! 😊 I'm Dubbo, your shopping buddy! Try asking me about 'show me top products', 'latest fashion trends', or 'toys for my kids'! I'm here to make shopping super fun! 🛍️✨",
      "I love helping you explore! 🧭💫 You can say things like 'take me home', 'show my cart', 'contact support', or 'tell me about Zarvoc'! What adventure shall we go on?",
      "I'm your friendly shopping companion! 🤖💝 Whether you want to find 'budget deals', 'trending gadgets', or just 'browse around', I'm here to help! What catches your interest today?",
      "Ooh, I'm excited to help! 🎉🔍 Try saying 'find me electronics', 'show kitchen items', 'sports equipment', or even 'I need gift ideas'! I understand natural conversation, so just talk to me normally!"
    ];
    
    moveRobot(Math.random() * 80 + 10, Math.random() * 80 + 10);
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleUserMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { type: 'user', text: text };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator with continuous listening info
    const typingText = isContinuousListening ? 'Processing... (Still listening 🎙️)' : 'Thinking...';
    const typingMessage = { type: 'ai', text: typingText, isTyping: true };
    setMessages(prev => [...prev, typingMessage]);

    // Get AI response
    const response = await getAIResponse(text);
    
    // Remove typing indicator and add real response
    setMessages(prev => prev.filter(msg => !msg.isTyping));
    const aiMessage = { type: 'ai', text: response };
    setMessages(prev => [...prev, aiMessage]);
    
    setInputText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserMessage(inputText);
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Welcome message when opening
      setShowSuggestions(false);
    }
  };

  return (
    <>
      {/* Floating Robot */}
      <div 
        className={`floating-robot ${isMoving ? 'moving' : ''} ${currentAnimation}`}
        style={{ 
          right: `${robotPosition.x}px`, 
          bottom: `${robotPosition.y}px` 
        }}
        onClick={toggleAssistant}
      >
        <div className="robot-body">
          <div className="robot-head">
            <div className="robot-eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="robot-mouth"></div>
          </div>
          <div className="robot-arms">
            <div className="arm left-arm"></div>
            <div className="arm right-arm"></div>
          </div>
        </div>
        {!isOpen && (
          <div className="robot-speech-bubble">
            Click me! 💬
          </div>
        )}
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <div className="ai-avatar">
              <img src="/Zarvoc.png" alt="Zarvoc Logo" className="zarvoc-logo" />
            </div>
            <div className="ai-info">
              <h3>Dubbo - Your Shopping Buddy</h3>
              <span className={`ai-status ${isContinuousListening ? 'listening-active' : ''}`}>
                {isContinuousListening ? '🎙️ Listening continuously...' : 'Ready to help you! ✨'}
              </span>
            </div>
            <button className="close-chat" onClick={toggleAssistant}>×</button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.isTyping ? (
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="product-suggestions">
                <h4>Recommended Products:</h4>
                {suggestions.map((product, index) => (
                  <div key={index} className="suggestion-card">
                    <div className="product-info">
                      <span className="product-name">{product.name}</span>
                      <span className="product-category">{product.category}</span>
                      {product.price && <span className="product-price">{product.price}</span>}
                    </div>
                    <div className="product-rating">
                      ⭐ {product.rating.toFixed(1)}
                    </div>
                  </div>
                ))}
                <button 
                  className="view-all-btn"
                  onClick={() => setShowSuggestions(false)}
                >
                  Got it! Thanks Dubbo! 😊
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Dubbo anything..."
              className="ai-input"
            />
            <button 
              type="button" 
              onClick={startListening}
              className={`voice-btn ${isListening && !isContinuousListening ? 'listening' : ''}`}
              disabled={isListening && !isContinuousListening}
              title="Click to speak once"
            >
              🎤
            </button>
            <button 
              type="button" 
              onClick={toggleContinuousListening}
              className={`voice-btn continuous-voice-btn ${isContinuousListening ? 'continuous-active' : ''}`}
              title={isContinuousListening ? "Click to stop continuous listening" : "Click to keep listening"}
            >
              {isContinuousListening ? '🔴' : '🎙️'}
            </button>
            <button 
              type="submit" 
              className="send-btn"
              disabled={!inputText.trim()}
            >
              ➤
            </button>
          </form>

          <div className="quick-actions">
            <button onClick={() => handleUserMessage('show me top products')}>
              Top Products
            </button>
            <button onClick={() => handleUserMessage('latest fashion')}>
              Fashion
            </button>
            <button onClick={() => handleUserMessage('electronics')}>
              Electronics
            </button>
            <button onClick={() => handleUserMessage('toys for kids')}>
              Toys
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
