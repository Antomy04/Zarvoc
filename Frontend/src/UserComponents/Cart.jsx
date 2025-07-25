
import React, { useEffect, useState } from "react";
import PurchaseGraph from "./PurchaseGraph";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/cart/${userId}`);
      const items = await res.json();
      setCartItems(items || []);
      setLoading(false);
    } catch (error) {
      console.error("Cart load error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let total = 0, count = 0;
    cartItems.forEach((item) => {
      total += item.price * item.qty;
      count += item.qty;
    });
    setSubtotal(total);
    setItemCount(count);
  }, [cartItems]);

  const changeQty = async (id, delta) => {
    const userId = localStorage.getItem("userId");
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.qty + delta);
    try {
      await fetch(`${apiUrl}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId: id, qty: newQty }),
      });

      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const deleteItem = async (id) => {
    const userId = localStorage.getItem("userId");
    try {
      await fetch(`${apiUrl}/api/cart/remove`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId: id }),
      });
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <div className="cart-loading">Loading...</div>;

  const userId = localStorage.getItem("userId");
  
  if (!userId) {
    return (
      <div className="cart-header-flipkart">
  <span className="text-gradient-purple">🛒 My Cart</span> <span className="cart-header-items">({itemCount} items)</span>
</div>
    );
  }

  // Prepare purchase data for graph (simulate savings per purchase)
  const purchases = cartItems.map((item) => ({
    date: item.name,
    savedAmount: ((item.price * 0.2) * item.qty), // 20% savings per item
  }));

  return (
    <div className="flipkart-cart-wrapper">
      <div className="cart-left">
        <div className="cart-header-flipkart">My Cart <span className="cart-header-items">({itemCount} items)</span></div>
        {cartItems.length === 0 ? (
          <div className="empty-cart-box">
            <img src="https://img.freepik.com/free-vector/empty-cart-concept-illustration_114360-1188.jpg" alt="Empty Cart" className="empty-cart-img" />
            <div className="empty-cart-title">Your cart is empty!</div>
            <div className="empty-cart-desc">Add items to it now.</div>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id} className="cart-item-flipkart">
              <div className="cart-item-img-box">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </div>
              <div className="cart-item-details-box">
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-brand">Brand: <span>Generic</span></div>
                <div className="cart-item-pricing">
                  <span className="cart-item-price">₹{item.price}</span>
                  <span className="cart-item-mrp">₹{(item.price*1.2).toFixed(0)}</span>
                </div>
                <div className="cart-item-actions">
                  <div className="qty-box">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="qty-btn"
                      disabled={item.qty === 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                      readOnly
                      className="qty-input"
                    />
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <span
                    onClick={() => deleteItem(item.id)}
                    className="remove-btn"
                  >
                    REMOVE
                  </span>
                  <span
                    className="save-later-btn"
                  >
                    SAVE FOR LATER
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Summary Card */}
      <div className="cart-right">
        <div className="summary-card">
          <div className="summary-title">PRICE DETAILS</div>
          <div className="summary-row"><span>Price ({itemCount} items)</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Discount</span><span className="summary-discount">-₹{(subtotal*0.2).toFixed(2)}</span></div>
          <div className="summary-row"><span>Delivery Charges</span><span className="summary-delivery">FREE</span></div>
          <div className="summary-total"><span>Total Amount</span><span>₹{(subtotal*0.8).toFixed(2)}</span></div>
          <button className="place-order-btn" disabled={itemCount === 0} onClick={()=>navigate('/checkout')}>PLACE ORDER</button>
        </div>
      </div>
      {/* Savings Graph at the bottom with explanation */}
      {cartItems.length > 0 && (
        <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '0.5rem', color: '#333', fontSize: '1rem'}}>
            <strong>See your total savings from purchases below. This graph shows how much you saved on each item in your cart (20% off MRP).</strong>
          </div>
          {/* Numeric summary of savings */}
          <div style={{textAlign: 'center', marginBottom: '1rem', color: '#8a2be2', fontWeight: 'bold'}}>
            Total Savings: ₹{purchases.reduce((sum, p) => sum + p.savedAmount, 0).toFixed(2)}<br />
            {purchases.map((p, idx) => (
              <span key={idx} style={{display: 'block', color: '#333', fontWeight: 'normal', fontSize: '0.95rem'}}>
                {p.date}: Saved ₹{p.savedAmount.toFixed(2)}
              </span>
            ))}
          </div>
          <PurchaseGraph purchases={purchases} />
        </div>
      )}
    </div>
  );
};


export default Cart;
