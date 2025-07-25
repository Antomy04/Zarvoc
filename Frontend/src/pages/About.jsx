import React, { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    // Create stars and shooting stars for the galaxy background
    const galaxy = document.getElementById('galaxy');
    const starCount = 100;
    const shootingStarCount = 5;
    if (!galaxy) return;
    galaxy.innerHTML = '';
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 2 + 3}s`;
      galaxy.appendChild(star);
    }
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      shootingStar.style.top = `${Math.random() * 100}vh`;
      shootingStar.style.animationDuration = `${Math.random() * 2 + 3}s`;
      galaxy.appendChild(shootingStar);
    }
    // Cleanup on unmount
    return () => { if (galaxy) galaxy.innerHTML = ''; };
  }, []);

  return (
    <div className="zorvac-website">
      {/* Galaxy Background with Stars and Shooting Stars */}
      <div className="galaxy" id="galaxy"></div>

      {/* Header/Navigation */}
      <header>
        <div className="navbar">
          <a href="/" className="logo">
            <img src="/Zarvoc.png" alt="Zarvoc Logo" className="logo-img" />
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact.html">Contact Us</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="animated">Welcome to Zarvoc</h1>
        <p className="animated delay-1">Your Ultimate Online Shopping Experience in the Dark</p>
        <a href="/" className="btn animated delay-2">Start Shopping</a>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-title animated">
          <h2>Who We Are</h2>
        </div>
        <div className="about-content">
          <div className="about-text animated">
            <h2>Cosmic Shopping Redefined</h2>
            <p>At Zarvoc, we've transformed online shopping into a stellar experience. We're not just another e-commerce platform; we're your intergalactic marketplace where convenience meets the stars.</p>
            <p>Our mission is to revolutionize e-commerce by combining stellar customer service with competitive prices, lightning-fast delivery, and an unforgettable user experience.</p>
          </div>
          <div className="about-image animated delay-1">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Zarvoc Night Shopping" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-section">
        <div class="section-title animated">
          <h2>Why Choose Zarvoc?</h2>
        </div>
        <div className="features-grid">
            <div className="feature-card animated">
            <div className="feature-icon">🚀</div>
            <h3>Universal Product Range</h3>
            <p>From fresh fruits & vegetables to the latest electronics and fashionable clothes, we've got everything you need across galaxies.</p>
          </div>
          <div className="feature-card animated delay-1">
            <div className="feature-icon">⚡</div>
            <h3>Warp Speed Delivery</h3>
            <p>Our logistics network moves at lightspeed. Get your orders faster than you can say "Beam me up, Scotty!"</p>
          </div>
          <div className="feature-card animated delay-2">
            <div className="feature-icon">💰</div>
            <h3>Stellar Deals</h3>
            <p>Enjoy cosmic discounts and black-hole-level savings with our daily offers and seasonal promotions.</p>
          </div>
          <div className="feature-card animated">
            <div className="feature-icon">⭐</div>
            <h3>Quality Nebula</h3>
            <p>We source directly from trusted suppliers across the universe to ensure only the best reaches you.</p>
          </div>
          <div className="feature-card animated delay-1">
            <div className="feature-icon">🔁</div>
            <h3>Zero-Gravity Returns</h3>
            <p>Our return policy is as easy as floating in space. No questions asked if you're not satisfied.</p>
          </div>
          <div className="feature-card animated delay-2">
            <div className="feature-icon">🛸</div>
            <h3>24/7 Alien Support</h3>
            <p>Our friendly customer service team is always on standby, ready to assist you day or night.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-title animated">
          <h2>Meet Our Team</h2>
        </div>
        <div className="team-grid">
          <div className="team-card animated">
            <img src="https://img.freepik.com/premium-photo/ninja-cyberpunk-man-illustration_950633-1046.jpg?w=2000" alt="Team Member 1" className="team-img" />
            <h3>UK</h3>
            <p>FullStack Developer</p>
          </div>
          <div className="team-card animated delay-1">
            <img src="https://i1.wp.com/wallpapercave.com/wp/wp3245892.jpg" alt="Team Member 2" className="team-img" />
            <h3>KK</h3>
            <p>FullStack Developer</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="section-title animated">
          <h2>Our Location</h2>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6345457114085!2d77.59446037550595!3d27.604857676241505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c6341!2sGLA%20University!5e0!3m2!1sen!2sin!4v1750656695270!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{border:0}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zarvoc Location"
          ></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="animated">Ready for a Cosmic Shopping Experience?</h2>
        <a href="/" className="btn animated delay-1">Explore Products</a>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">
              <img src="/Zarvoc.png" alt="Zarvoc Logo" className="logo-img" />
            </div>
            <p>Your Ultimate Online Supermarket Experience. Fresh, Fast, and Affordable.</p>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="/">Offers</a></li>
              <li><a href="/contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Categories</h3>
            <ul>
              <li><a href="#">Fruits & Vegetables</a></li>
              <li><a href="#">Bakery</a></li>
              <li><a href="#">Clothes</a></li>
              <li><a href="#">Electronic Items</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Contact Us</h3>
            <ul>
              <li><FaMapMarkerAlt /> GLA University, Mathura</li>
              <li><FaPhone /> +91 6399003541</li>
              <li><FaEnvelope /> info@zarvoc.com</li>
              <li><FaClock /> 24/7 Service</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025-2027 Zarvoc. All Rights Reserved.</p>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx global>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          overflow-x: hidden;
          color: #e2e8f0;
          background-color: #0f172a;
          position: relative;
        }

        /* Galaxy Background with Stars Animation */
        .galaxy {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .star {
          position: absolute;
          background-color: #fff;
          border-radius: 50%;
          animation: twinkle 5s infinite ease-in-out;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        /* Enhanced Shooting Star Animation - Falling/Breaking Effect */
        .shooting-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: shooting 3s linear infinite;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 50%;
          animation: shooting-trail 3s linear infinite;
        }

        @keyframes shooting {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(500px, 500px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes shooting-trail {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Header/Navbar Styles */
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

        .logo span {
          color: #f59e0b;
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

        /* Hero Section Styles */
        .hero {
          text-align: center;
          padding: 120px 20px;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(245, 158, 11, 0.1));
          position: relative;
          overflow: hidden;
        }

        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
          color: #f8fafc;
          text-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
        }

        .hero p {
          font-size: 18px;
          max-width: 700px;
          margin: 0 auto 30px;
          color: #94a3b8;
        }

        /* Button Styles */
        .btn {
          display: inline-block;
          background: linear-gradient(90deg, #7c3aed, #f59e0b);
          color: white;
          padding: 12px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          position: relative;
          z-index: 1;
          border: none;
          cursor: pointer;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
        }

        /* About Section Styles */
        .about-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
          background-color: rgba(15, 23, 42, 0.7);
          border-radius: 10px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
          margin-top: -50px;
          position: relative;
          z-index: 10;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: #f8fafc;
          position: relative;
        }

        .section-title::after {
          content: "";
          display: block;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #7c3aed, #f59e0b);
          margin: 15px auto 0;
          border-radius: 2px;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
          }
        }

        .about-text h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #7c3aed;
        }

        .about-text p {
          line-height: 1.8;
          margin-bottom: 15px;
          color: #94a3b8;
        }

        /* Features Grid with Animated Cards */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .feature-card {
          background-color: rgba(15, 23, 42, 0.8);
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-top: 4px solid #7c3aed;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.1), transparent);
          transition: 0.5s;
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          background-color: rgba(15, 23, 42, 0.9);
        }

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-icon {
          font-size: 40px;
          background: linear-gradient(90deg, #7c3aed, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 22px;
          margin-bottom: 15px;
          color: #f8fafc;
        }

        .feature-card p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* Vision Section Styles */
        .vision-section {
          background: linear-gradient(135deg, #7c3aed, #f59e0b);
          color: white;
          padding: 100px 20px;
          margin-top: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .vision-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/></svg>');
          background-size: 20px 20px;
          opacity: 0.5;
        }

        .vision-section h2 {
          font-size: 36px;
          margin-bottom: 30px;
          position: relative;
        }

        .vision-section p {
          max-width: 800px;
          margin: 0 auto;
          font-size: 18px;
          line-height: 1.8;
          position: relative;
        }

        /* Team Section Styles */
        .team-section {
          max-width: 1200px;
          margin: 50px auto;
          padding: 0 20px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .team-card {
          background-color: rgba(15, 23, 42, 0.8);
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-top: 4px solid #7c3aed;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .team-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .team-img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 20px;
          border: 3px solid #7c3aed;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .team-card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #f8fafc;
        }

        .team-card p {
          color: #94a3b8;
          font-size: 14px;
        }

        /* Location Section Styles */
        .location-section {
          max-width: 1200px;
          margin: 50px auto;
          padding: 0 20px;
        }

        .map-container {
          margin-top: 30px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .map-container iframe {
          width: 100%;
          height: 400px;
          border: none;
        }

        /* CTA Section Styles */
        .cta-section {
          text-align: center;
          padding: 100px 20px;
          position: relative;
        }

        .cta-section h2 {
          font-size: 36px;
          margin-bottom: 30px;
          color: #f8fafc;
        }

        /* Footer Styles */
        footer {
          background-color: rgba(15, 23, 42, 0.95);
          color: white;
          padding: 50px 20px;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          text-align: left;
        }

        .footer-logo {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
        }

        .footer-logo span {
          color: #f59e0b;
        }

        .footer-links h3 {
          font-size: 18px;
          margin-bottom: 20px;
          color: #f59e0b;
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: #e2e8f0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #7c3aed;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-links a {
          color: white;
          font-size: 20px;
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: #7c3aed;
        }

        .copyright {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }

        /* Image Styles */
        .about-image img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Animation Styles */
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

        .animated {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .delay-1 {
          animation-delay: 0.2s;
        }

        .delay-2 {
          animation-delay: 0.4s;
        }

        .delay-3 {
          animation-delay: 0.6s;
        }
      `}</style>
      <style jsx global>{`
        .logo-img {
          height: 48px;
          width: auto;
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default About;
