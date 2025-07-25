import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMoon, FaSun, FaCheckCircle, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    problem: '',
    quality_rating: '0',
    service_rating: '0',
    delivery_rating: '0',
    address: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [coordinates, setCoordinates] = useState('Latitude: 0, Longitude: 0');

  useEffect(() => {
    createStars();
  }, []);

  const createStars = () => {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    starsContainer.innerHTML = '';
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('falling-star');
      
      const size = Math.random() * 3;
      const xPos = Math.random() * 100;
      const duration = 2 + Math.random() * 5 + 's';
      const delay = Math.random() * 5 + 's';
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${xPos}%`;
      star.style.animationDuration = duration;
      star.style.animationDelay = delay;
      
      starsContainer.appendChild(star);
    }

    const bigStarCount = 5;
    for (let i = 0; i < bigStarCount; i++) {
      const bigStar = document.createElement('div');
      bigStar.classList.add('big-shooting-star');
      
      const xPos = Math.random() * 100;
      const duration = 5 + Math.random() * 5 + 's';
      const delay = Math.random() * 5 + 's';
      
      bigStar.style.left = `${xPos}%`;
      bigStar.style.animationDuration = duration;
      bigStar.style.animationDelay = delay;
      
      starsContainer.appendChild(bigStar);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRating = (question, value) => {
    setFormData(prev => ({
      ...prev,
      [`${question}_rating`]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'phone', 'problem', 'message'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (formData.problem === 'Feedback') {
      const ratings = ['quality', 'service', 'delivery'];
      ratings.forEach(rating => {
        if (formData[`${rating}_rating`] === '0') {
          newErrors.rating = 'Please rate all categories';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          access_key: '27f1a740-eea8-4ad9-a729-d316b59775d3'
        })
      });

      const data = await response.json();
      if (data.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          problem: '',
          quality_rating: '0',
          service_rating: '0',
          delivery_rating: '0',
          address: '',
          message: ''
        });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // const toggleTheme = () => {
  //   setDarkMode(darkMode);
  // };

  const renderStars = (question) => {
    const stars = [];
    const rating = parseInt(formData[`${question}_rating`]);
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i}
          className="star-rating"
          onMouseOver={() => handleRating(question, i.toString())}
          onClick={() => handleRating(question, i.toString())}
          style={{ 
            fontSize: '1.5rem', 
            cursor: 'pointer', 
            color: i <= rating ? '#ffd700' : '#9370db',
            marginRight: '0.5rem'
          }}
        >
          <FaStar />
        </span>
      );
    }
    
    return stars;
  };

  return (
    <div className={`contact-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Shooting stars background */}
      <div className="stars" id="stars"></div>
      
      {/* Header/Navigation */}
      <header>
        <div className="navbar">
          <a href="/" className="logo">
            <img src="/Zarvoc.png" alt="Zorvac Logo" className="logo-img" />
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="animated">Contact Zorvac</h1>
        <p className="animated delay-1">Have questions or feedback? We'd love to hear from you!</p>
      </section>
      
      {/* Contact Form Container */}
      <div className="container">
        <div className="form-map-container">
          {/* Form Section */}
          <div className="form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              
              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
              
              {/* Issue Type Dropdown */}
              <div className="form-group">
                <label htmlFor="problem" className="form-label">What can we help you with? *</label>
                <select
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.problem ? 'error' : ''}`}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Return/Exchange">Return/Exchange</option>
                  <option value="Payment Problem">Payment Problem</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
                {errors.problem && <p className="error-message">{errors.problem}</p>}
              </div>
              
              {/* Rating Section */}
              {formData.problem === 'Feedback' && (
                <div className="rating-container">
                  <div className="rating-group">
                    <label className="form-label">Product Quality:</label>
                    <div className="stars-container">
                      {renderStars('quality')}
                    </div>
                  </div>
                  
                  <div className="rating-group">
                    <label className="form-label">Customer Service:</label>
                    <div className="stars-container">
                      {renderStars('service')}
                    </div>
                  </div>
                  
                  <div className="rating-group">
                    <label className="form-label">Delivery Speed:</label>
                    <div className="stars-container">
                      {renderStars('delivery')}
                    </div>
                  </div>
                  
                  {errors.rating && <p className="error-message">{errors.rating}</p>}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your address (optional)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.message ? 'error' : ''}`}
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
                {errors.message && <p className="error-message">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span>Submitting...</span>
                    <div className="spinner"></div>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
            
            {showSuccess && (
              <div className="success-message">
                <div className="success-content">
                  <FaCheckCircle className="success-icon" />
                  <div>
                    <p className="success-title">Message sent successfully!</p>
                    <p className="success-text">We'll get back to you soon.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Map and Contact Info Section */}
          <div className="info-section">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>We're here to help! Reach out to us through any of the following methods:</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h4>Address</h4>
                    <p>GLA University, Mathura, India</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h4>Phone</h4>
                    <p>+91 6399003541</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h4>Email</h4>
                    <p>info@zorvac.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <div>
                    <h4>Hours</h4>
                    <p>24/7 Customer Support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="map-section">
              <h3>Our Location</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6345457114085!2d77.59446037550595!3d27.604857676241505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c6341!2sGLA%20University!5e0!3m2!1sen!2sin!4v1750656695270!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{border:0}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zorvac Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Zorvac E-commerce</h3>
              <p>Your trusted shopping destination</p>
              <div className="social-links">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025-2027 Zorvac E-commerce Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Theme Toggle Button
      <button
        onClick={toggleTheme}
        className="theme-toggle"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button> */}

      {/* CSS Styles */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .contact-page {
          min-height: 100vh;
          position: relative;
          transition: all 0.3s ease;
        }

        .dark-mode {
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          color: #e6e6fa;
        }

        .light-mode {
          background: linear-gradient(135deg, #f0f8ff, #e6f3ff, #ddeeff);
          color: #333333;
        }

        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }
        
        .falling-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: fall linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .big-shooting-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: big-fall linear infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        @keyframes big-fall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0;
          }
        }

        /* Header Styles */
        header {
          background-color: rgba(15, 23, 42, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
        }

        .logo {
          font-size: 28px;
          font-weight: 700;
          color: #7c3aed;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          text-decoration: none;
          color: #e2e8f0;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #7c3aed;
        }

        .logo-img {
          height: 48px;
          width: auto;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(245, 158, 11, 0.1));
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #7c3aed, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.8;
        }

        /* Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .form-map-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin: 50px 0;
        }

        @media (max-width: 968px) {
          .form-map-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Form Section */
        .form-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--primary-color, #7c3aed);
        }

        .form-input {
          padding: 12px 16px;
          border: 2px solid rgba(124, 58, 237, 0.3);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: inherit;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .form-input.error {
          border-color: #ff6b6b;
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .error-message {
          color: #ff6b6b;
          font-size: 14px;
          margin-top: 5px;
        }

        /* Rating Styles */
        .rating-container {
          margin: 20px 0;
          padding: 20px;
          background: rgba(124, 58, 237, 0.1);
          border-radius: 10px;
        }

        .rating-group {
          margin-bottom: 15px;
        }

        .stars-container {
          display: flex;
          gap: 5px;
          margin-top: 5px;
        }

        .star-rating {
          transition: all 0.2s;
        }

        .star-rating:hover {
          transform: scale(1.2);
        }

        /* Submit Button */
        .submit-btn {
          background: linear-gradient(90deg, #7c3aed, #f59e0b);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Message */
        .success-message {
          margin-top: 20px;
          padding: 20px;
          background: rgba(46, 204, 113, 0.2);
          border: 1px solid rgba(46, 204, 113, 0.5);
          border-radius: 10px;
          color: #2ecc71;
        }

        .success-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .success-icon {
          font-size: 24px;
        }

        .success-title {
          font-weight: 600;
          margin-bottom: 5px;
        }

        .success-text {
          opacity: 0.8;
        }

        /* Info Section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .contact-info {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .contact-info h2 {
          margin-bottom: 15px;
          color: #7c3aed;
        }

        .contact-info p {
          margin-bottom: 25px;
          opacity: 0.8;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .contact-icon {
          font-size: 20px;
          color: #7c3aed;
          min-width: 20px;
        }

        .contact-item h4 {
          margin-bottom: 5px;
          color: #7c3aed;
        }

        .contact-item p {
          margin: 0;
          opacity: 0.8;
        }

        /* Map Section */
        .map-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .map-section h3 {
          margin-bottom: 20px;
          color: #7c3aed;
        }

        .map-container {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        /* Footer */
        .footer {
          margin-top: 80px;
          padding: 40px 0 20px;
          border-top: 1px solid rgba(124, 58, 237, 0.3);
        }

        .footer-content {
          text-align: center;
        }

        .footer-section h3 {
          color: #7c3aed;
          margin-bottom: 10px;
        }

        .footer-section p {
          opacity: 0.8;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .social-links a {
          color: #7c3aed;
          font-size: 20px;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          color: #f59e0b;
          transform: translateY(-2px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid rgba(124, 58, 237, 0.2);
          opacity: 0.6;
        }

        /* Theme Toggle */
        .theme-toggle {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(90deg, #7c3aed, #f59e0b);
          color: white;
          border: none;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
        }

        /* Animation Classes */
        .animated {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .delay-1 {
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
