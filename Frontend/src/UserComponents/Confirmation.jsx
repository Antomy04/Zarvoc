import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Checkout.css';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="checkout-container">
        <div className="cart-loading">No order found. <button onClick={() => navigate('/')}>Go Home</button></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <div className="checkout-logo">ZARVOC</div>
        <h1 className="checkout-title">Order Confirmed!</h1>
        <div className="checkout-cart-icon">✅</div>
      </header>
      <main className="checkout-main">
        <section className="checkout-section">
          <h2 className="section-title">Thank you for your purchase!</h2>
          <p>Your order has been placed successfully.</p>
          <div className="order-details">
            <div><b>Order ID:</b> {order._id}</div>
            <div><b>Amount Paid:</b> ₹{order.amount.toFixed(2)}</div>
            <div><b>Payment Status:</b> {order.paymentStatus}</div>
            <div><b>Items:</b></div>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} × {item.qty} (₹{item.price})</li>
              ))}
            </ul>
          </div>
          <button className="pay-button active" onClick={() => navigate('/')}>Continue Shopping</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
