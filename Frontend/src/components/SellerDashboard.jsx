import { useState, useEffect } from 'react';
import Header from '../UserComponents/Header';
import PricingAssistant from './PricingAssistant';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPricingAssistant, setShowPricingAssistant] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Get seller ID from localStorage or authentication context
    const storedSellerId = localStorage.getItem('sellerId') || localStorage.getItem('userId');
    console.log('🔍 Stored seller ID:', storedSellerId);
    
    if (storedSellerId) {
      setSellerId(storedSellerId);
      fetchProducts(storedSellerId);
    } else {
      console.log('❌ No seller ID found in localStorage');
      setError('Please login as a seller to view your products');
      setLoading(false);
    }
  }, []);

  const fetchProducts = async (currentSellerId) => {
    try {
      setLoading(true);
      console.log('🔍 Fetching products for seller:', currentSellerId);
      
      // Fetch products for the specific seller
      const response = await fetch(`${apiUrl}/api/products/seller/${currentSellerId}`);
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Products received:', data);
        setProducts(data);
      } else if (response.status === 404) {
        console.log('📭 No products found for this seller');
        // No products found for this seller
        setProducts([]);
      } else {
        console.log('❌ Failed to load products, status:', response.status);
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handlePricingAnalysis = (product) => {
    setSelectedProduct(product);
    setShowPricingAssistant(true);
  };

  const closePricingAssistant = () => {
    setShowPricingAssistant(false);
    setSelectedProduct(null);
  };

  const handlePriceUpdate = async (productId, newPrice) => {
    try {
      // Update the product price in the local state immediately for better UX
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === productId 
            ? { ...product, price: newPrice }
            : product
        )
      );
      
      // Also update the selected product if it's the one being updated
      if (selectedProduct && selectedProduct._id === productId) {
        setSelectedProduct(prev => ({ ...prev, price: newPrice }));
      }
      
      console.log('✅ Price updated in dashboard for product:', productId, 'New price:', newPrice);
    } catch (error) {
      console.error('❌ Error updating price in dashboard:', error);
      // If there's an error, refetch the products to ensure consistency
      if (sellerId) {
        fetchProducts(sellerId);
      }
    }
  };

  const handleDelete = async (productId) => {
    if (!sellerId) {
      alert('Please login as a seller to delete products');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sellerId: sellerId })
        });
        
        if (response.ok) {
          alert('Product deleted successfully!');
          fetchProducts(sellerId); // Refresh the products list
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to delete product');
        }
      } catch (err) {
        alert('Failed to delete product');
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-container">
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading products...
          </div>
        )}

        {!loading && !error && products.length === 0 && sellerId && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            You haven't added any products yet. Click "Add more item" to start selling!
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ color: 'red', marginBottom: '20px' }}>
              {error}
            </div>
            {!sellerId && (
              <div style={{ color: '#666' }}>
                Please login or register as a seller to access your dashboard.
              </div>
            )}
          </div>
        )}

        {!loading && !error && products.length > 0 && products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name || 'Product'} 
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '6px' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.textContent = 'No Image';
                  }}
                />
              ) : (
                'Image'
              )}
            </div>
            <div className="product-info">
              <div className="product-desc">
                {product.description || product.name || 'Product description'}
              </div>
              <div className="product-price">
                ₹{product.price || 'Product price'}
              </div>
              <div className="product-meta">
                <span className="amount-badge">
                  Amount: {product.amount || 'Amount available'}
                </span>
                <button 
                  className="icon-btn ai-pricing-btn" 
                  title="AI Pricing Analysis"
                  onClick={() => handlePricingAnalysis(product)}
                >
                  🤖
                </button>
                <button 
                  className="icon-btn delete-btn" 
                  title="Delete"
                  onClick={() => handleDelete(product._id)}
                >
                  &#128465;
                </button>
                <button className="icon-btn" title="Share">
                  &#128203;
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button className="add-btn" disabled>
          +Add more item
        </button>
      </div>
      
      {showPricingAssistant && selectedProduct && (
        <PricingAssistant 
          product={selectedProduct} 
          onClose={closePricingAssistant}
          onPriceUpdate={handlePriceUpdate}
        />
      )}
    </div>
  );
};

export default SellerDashboard;
