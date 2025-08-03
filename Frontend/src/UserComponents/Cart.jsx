
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
      <div className="flex flex-col justify-center items-center h-screen bg-slate-100 text-center p-4">
                <img src="https://placehold.co/300x300/e2e8f0/64748b?text=Login+Required" alt="Login required" className="w-48 h-48 mx-auto mb-8 rounded-full"/>
                <h3 className="text-2xl font-bold text-slate-800">Please Log In</h3>
                <p className="text-slate-500 mt-2 max-w-sm">You need to be logged in to view your cart. Please log in to continue your shopping journey.</p>
                <button 
                    onClick={() => navigate('/login')} // Navigate to your login page
                    className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Side: Cart Items */}
                    <main className="w-full lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
                            <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
                                My Cart <span className="text-slate-500 font-normal">({itemCount} items)</span>
                            </h2>
                            {cartItems.length === 0 ? (
                                <div className="text-center py-16">
                                    <img src="https://placehold.co/300x300/e2e8f0/64748b?text=Empty+Cart" alt="Empty Cart" className="w-48 h-48 mx-auto mb-6 rounded-full" />
                                    <h3 className="text-xl font-semibold text-slate-700">Your cart is feeling a bit light!</h3>
                                    <p className="text-slate-500 mt-2">Add some amazing products to get started.</p>
                                    <button onClick={() => navigate('/')} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all">
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b border-slate-200 pb-6 last:border-b-0 transition-all duration-300 hover:bg-slate-50 hover:shadow-md -mx-6 px-6">
                                            <div className="flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-36 sm:w-32 sm:h-32 object-cover rounded-lg" />
                                            </div>
                                            <div className="flex-grow flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-800 hover:text-indigo-600 cursor-pointer">{item.name}</h3>
                                                    <p className="text-sm text-slate-500">Brand: Generic</p>
                                                    <div className="flex items-baseline gap-2 mt-2">
                                                        <span className="text-xl font-bold text-slate-900">₹{item.price.toLocaleString()}</span>
                                                        <span className="text-sm text-slate-400 line-through">₹{(item.price * 1.2).toLocaleString()}</span>
                                                        <span className="text-sm font-semibold text-emerald-600">20% off</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 sm:gap-6 mt-4">
                                                    <div className="flex items-center bg-slate-100 rounded-full">
                                                        <button onClick={() => changeQty(item.id, -1)} className="px-3 py-1 text-xl font-bold text-slate-600 hover:bg-slate-200 rounded-l-full" disabled={item.qty === 1}>-</button>
                                                        <span className="w-12 text-center font-semibold text-slate-800">{item.qty}</span>
                                                        <button onClick={() => changeQty(item.id, 1)} className="px-3 py-1 text-xl font-bold text-slate-600 hover:bg-slate-200 rounded-r-full">+</button>
                                                    </div>
                                                    <button className="font-semibold text-sm text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                        SAVE
                                                    </button>
                                                    <button onClick={() => deleteItem(item.id)} className="font-semibold text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Right Side: Price Summary */}
                    <aside className="w-full lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h3 className="text-lg font-bold text-slate-500 border-b border-slate-200 pb-4 mb-4">PRICE DETAILS</h3>
                            <div className="space-y-3 text-slate-700">
                                <div className="flex justify-between"><span>Price ({itemCount} items)</span> <span>₹{subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Discount</span> <span className="text-emerald-600">- ₹{(subtotal * 0.2).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Delivery Charges</span> <span className="text-emerald-600">FREE</span></div>
                                <div className="border-t border-dashed my-4"></div>
                                <div className="flex justify-between text-xl font-bold">
                                    <span className="text-slate-900">Total Amount</span>
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{(subtotal * 0.8).toLocaleString()}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed" 
                                disabled={itemCount === 0}
                            >
                                PLACE ORDER
                            </button>
                             <div className="flex items-center justify-center mt-4 text-xs text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.02.997.997 0 001 6v5a1 1 0 001.528.857 12.022 12.022 0 0114.944 0A1 1 0 0019 11V6a.997.997 0 00-1.166-.98A11.954 11.954 0 0110 1.944zM10 4.055a9.955 9.955 0 00-7.071 2.93.998.998 0 01-1.414-1.414A11.95 11.95 0 0110 2.055a11.95 11.95 0 018.485 3.511.998.998 0 01-1.414 1.414A9.955 9.955 0 0010 4.055zM10 18a.5.5 0 01-.5-.5v-5a.5.5 0 011 0v5a.5.5 0 01-.5.5zM8 18a.5.5 0 01-.5-.5v-5a.5.5 0 011 0v5a.5.5 0 01-.5.5zm4 0a.5.5 0 01-.5-.5v-5a.5.5 0 011 0v5a.5.5 0 01-.5.5z" clipRule="evenodd" />
                                </svg>
                                Safe and Secure Payments. 100% Authentic products.
                            </div>
                        </div>
                    </aside>
                </div>
                
                {/* Savings Graph Section */}
                {cartItems.length > 0 && (
                    <div className="mt-8">
                        <PurchaseGraph purchases={purchases} />
                    </div>
                )}
            </div>
        </div>
  );
};


export default Cart;
