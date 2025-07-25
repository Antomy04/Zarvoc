import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Checkout.css';

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    items: 0,
    delivery: 50.00,
    promotion: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('EWS 246-247, Ravi khand banglabazar, LUCKNOW, UTTAR PRADESH, 226012, India');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate();

  const total = orderSummary.items + orderSummary.delivery;
  const orderTotal = total - orderSummary.promotion;

  // Fetch cart items and user data on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError('');
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Please login to view your cart.');
        setLoading(false);
        return;
      }
      
      try {
        // Fetch cart items
        const res = await fetch(`${apiUrl}/api/cart/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const items = await res.json();
        setCartItems(items || []);
        
        // Fetch user data
        const userRes = await fetch(`${apiUrl}/user/${userId}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserName(userData.name || 'User');
        }
      } catch (err) {
        setError('Could not load cart.');
      }
      setLoading(false);
    };
    fetchCart();
  }, []);

  // Update order summary when cart or coupon changes
  useEffect(() => {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += (item.price || 0) * (item.qty || 1);
    });
    let promo = 0;
    if (couponApplied) {
      promo = Math.round(subtotal * 0.1); // 10% off for demo
    }
    setOrderSummary({
      items: subtotal,
      delivery: subtotal > 0 ? 50 : 0,
      promotion: promo
    });
  }, [cartItems, couponApplied]);

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
  };

  const handleCouponApply = () => {
    if (couponCode.trim()) {
      // Simulate coupon validation
      if (couponCode.trim().toLowerCase() === 'save10') {
        setCouponApplied(true);
        setError('');
      } else {
        setCouponApplied(false);
        setError('Invalid coupon code. Try "SAVE10".');
      }
    }
  };

  const handleUpiVerify = () => {
    if (upiId.trim()) {
      // Simple UPI ID validation
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (upiRegex.test(upiId.trim())) {
        setUpiVerified(true);
        setError('');
        // Generate QR code URL (using a free QR code generator)
        const qrData = encodeURIComponent(`upi://pay?pa=${upiId}&pn=Zarvoc&am=${orderTotal}&cu=INR&tn=Payment for Zarvoc Order`);
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`);
        console.log('UPI ID verified:', upiId);
      } else {
        setUpiVerified(false);
        setError('Please enter a valid UPI ID (e.g., name@paytm)');
      }
    }
  };

  const handleAddressChange = () => {
    if (isEditingAddress) {
      if (newAddress.trim()) {
        setUserAddress(newAddress.trim());
      }
      setIsEditingAddress(false);
      setNewAddress('');
    } else {
      setNewAddress(userAddress);
      setIsEditingAddress(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedPayment || cartItems.length === 0 || !upiVerified) {
      setError('Please verify your UPI ID before placing the order.');
      return;
    }

    const userId = localStorage.getItem('userId');

    // Show payment interface
    setShowPayment(true);
    
    // Simulate payment processing with Razorpay-like interface
    setTimeout(async () => {
      try {
        // Simulate payment success
        const simulatedPaymentId = `razorpay_${Date.now()}`;
        
        const res = await fetch(`${apiUrl}/api/orders/place`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            items: cartItems,
            amount: orderTotal,
            paymentId: simulatedPaymentId,
            address: userAddress,
            paymentMethod: 'UPI',
            upiId: upiId
          })
        });
        
        const data = await res.json();
        if (data.success) {
          // Clear cart after successful order
          await fetch(`${apiUrl}/api/cart/${userId}`, { method: 'DELETE' });
          navigate('/confirmation', { state: { order: data.order } });
        } else {
          setError('Failed to place order.');
          setShowPayment(false);
        }
      } catch (err) {
        setError('Payment failed. Please try again.');
        setShowPayment(false);
      }
    }, 3000); // 3 second delay to simulate payment processing
  };

  if (loading) {
    return <div className="checkout-container"><div className="cart-loading">Loading...</div></div>;
  }
  if (error) {
    return <div className="checkout-container"><div className="cart-loading">{error}</div></div>;
  }

  return (
    <div className="checkout-container">
      {/* Header */}
      <header className="checkout-header">
        <div className="checkout-logo">ZARVOC</div>
        <h1 className="checkout-title">Secure checkout</h1>
        <div className="checkout-cart-icon">🛒</div>
      </header>

      {/* Main Content */}
      <main className="checkout-main">
        {/* Left Column */}
        <section className="checkout-left">
          {/* Delivery Address */}
          <div className="checkout-section">
            <div className="delivery-address">
              <div className="address-info">
                <h2 className="section-title">Delivering to {userName}</h2>
                {isEditingAddress ? (
                  <textarea
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="address-textarea"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p className="address-text">{userAddress}</p>
                )}
                <a href="#" className="delivery-instructions">Add delivery instructions</a>
              </div>
              <button className="change-btn" onClick={handleAddressChange}>
                {isEditingAddress ? 'Save' : 'Change'}
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="checkout-section">
            <h2 className="section-title">Your Items</h2>
            {cartItems.length === 0 ? (
              <div className="empty-cart-box">Your cart is empty.</div>
            ) : (
              <ul style={{padding:0, margin:0, listStyle:'none'}}>
                {cartItems.map((item) => (
                  <li key={item.id} style={{display:'flex',alignItems:'center',marginBottom:'12px',borderBottom:'1px solid #eee',paddingBottom:'8px'}}>
                    <img src={item.image} alt={item.name} style={{width:48,height:48,objectFit:'contain',marginRight:16,background:'#f5f5f5',borderRadius:8}} />
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500}}>{item.name}</div>
                      <div style={{fontSize:'0.95rem',color:'#878787'}}>Qty: {item.qty} × ₹{item.price}</div>
                    </div>
                    <div style={{fontWeight:600, color:'#212121'}}>₹{(item.price*item.qty).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h2 className="section-title">Payment Method</h2>

            {/* Coupon */}
            <div className="coupon-section">
              <label className="coupon-label">Apply coupon</label>
              <div className="coupon-input-group">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                  placeholder="Enter coupon code"
                />
                <button
                  onClick={handleCouponApply}
                  className={`apply-btn ${couponCode.trim() ? 'active' : ''}`}
                  disabled={!couponCode.trim()}
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <div style={{color:'#10b981',fontSize:'0.95rem',marginTop:4}}>Coupon applied! 10% off</div>
              )}
            </div>

            {/* Payment Options - Only UPI */}
            <fieldset className="payment-fieldset">
              <legend className="payment-legend">UPI Payment</legend>

              {/* UPI */}
              <div className="payment-option">
                <label className="payment-label">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={(e) => handlePaymentChange(e.target.value)}
                    className="payment-radio"
                  />
                  <span>UPI Payment</span>
                </label>
                <div className="upi-input-group">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g., name@paytm)"
                    className="upi-input"
                  />
                  <button
                    onClick={handleUpiVerify}
                    className={`verify-btn ${upiId.trim() ? 'active' : ''}`}
                    disabled={!upiId.trim()}
                  >
                    {upiVerified ? '✓ Verified' : 'Verify'}
                  </button>
                </div>
                <p className="upi-hint">Enter your UPI ID in the format: name/phone@bankname (e.g., john@paytm)</p>
                
                {upiVerified && qrCodeUrl && (
                  <div style={{marginTop: '15px', padding: '15px', border: '1px solid #10b981', borderRadius: '8px', backgroundColor: '#f0fdf4'}}>
                    <p style={{color: '#10b981', fontWeight: '500', marginBottom: '10px'}}>✓ UPI ID Verified Successfully!</p>
                    <div style={{textAlign: 'center'}}>
                      <p style={{fontSize: '14px', color: '#666', marginBottom: '10px'}}>Scan QR Code to Pay</p>
                      <img src={qrCodeUrl} alt="UPI QR Code" style={{border: '1px solid #ddd', borderRadius: '8px'}} />
                      <p style={{fontSize: '12px', color: '#888', marginTop: '8px'}}>Amount: ₹{orderTotal.toFixed(2)}</p>
                    </div>
                  </div>
                )}
                
                {error && error.includes('UPI') && (
                  <div style={{color: '#ef4444', fontSize: '14px', marginTop: '8px'}}>{error}</div>
                )}
              </div>
            </fieldset>
          </div>
        </section>

        {/* Right Column */}
        <aside className="checkout-right">
          <button
            onClick={handlePlaceOrder}
            className={`pay-button ${upiVerified ? 'active' : ''}`}
            disabled={!upiVerified || cartItems.length === 0}
          >
            {upiVerified ? 'Pay Now' : 'Verify UPI ID to Continue'}
          </button>
          
          {error && !error.includes('UPI') && (
            <div style={{color: '#ef4444', fontSize: '14px', marginTop: '8px', textAlign: 'center'}}>{error}</div>
          )}
          
          <ul className="order-summary">
            <li className="summary-item">
              <span>Items:</span>
              <span>₹{orderSummary.items.toFixed(2)}</span>
            </li>
            <li className="summary-item">
              <span>Delivery:</span>
              <span>₹{orderSummary.delivery.toFixed(2)}</span>
            </li>
            <li className="summary-item">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </li>
            <li className="summary-item">
              <span>Promotion Applied:</span>
              <span>- ₹{orderSummary.promotion.toFixed(2)}</span>
            </li>
            <hr className="summary-divider" />
            <li className="summary-total">
              <span>Order Total:</span>
              <span>₹{orderTotal.toFixed(2)}</span>
            </li>
          </ul>
        </aside>
      </main>
      
      {/* Payment Processing Modal */}
      {showPayment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #4F46E5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <h3 style={{color: '#333', marginBottom: '10px'}}>Processing Payment</h3>
            <p style={{color: '#666', fontSize: '14px'}}>Please wait while we process your UPI payment...</p>
            <p style={{color: '#4F46E5', fontWeight: '600', marginTop: '15px'}}>₹{orderTotal.toFixed(2)}</p>
            <p style={{color: '#888', fontSize: '12px', marginTop: '5px'}}>UPI ID: {upiId}</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <Footer />
    </div>
  );
};

export default Checkout;
