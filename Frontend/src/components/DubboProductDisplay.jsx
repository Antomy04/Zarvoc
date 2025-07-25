import React from 'react';
import { useProductDisplay } from '../contexts/ProductDisplayContext';
import './DubboProductDisplay.css';

const DubboProductDisplay = () => {
  const { displayedProducts, displayTitle, showDubboProducts, hideProductDisplay } = useProductDisplay();

  if (!showDubboProducts || displayedProducts.length === 0) {
    return null;
  }

  return (
    <div className="dubbo-product-display">
      <div className="dubbo-display-header">
        <div className="dubbo-title-section">
          <img src="/Zarvoc.png" alt="Dubbo" className="dubbo-mini-logo" />
          <h2>{displayTitle}</h2>
          <span className="dubbo-subtitle">🤖 Curated by your AI shopping buddy</span>
        </div>
        <button className="close-dubbo-display" onClick={hideProductDisplay}>
          ✕
        </button>
      </div>
      
      <div className="dubbo-products-grid">
        {displayedProducts.map((product, index) => (
          <div key={index} className="dubbo-product-card">
            <div className="dubbo-product-image">
              <img 
                src={product.image || '/api/placeholder/200/200'} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/api/placeholder/200/200';
                }}
              />
              <div className="dubbo-product-badge">Dubbo's Pick</div>
            </div>
            
            <div className="dubbo-product-info">
              <h3 className="dubbo-product-name">{product.name}</h3>
              <p className="dubbo-product-category">{product.category}</p>
              
              <div className="dubbo-product-details">
                <div className="dubbo-product-rating">
                  <span className="rating-stars">
                    {'⭐'.repeat(Math.floor(product.rating))}
                  </span>
                  <span className="rating-number">{product.rating.toFixed(1)}</span>
                </div>
                
                <div className="dubbo-product-price">
                  {product.price}
                </div>
              </div>
              
              <div className="dubbo-product-actions">
                <button className="dubbo-add-to-cart">
                  🛒 Add to Cart
                </button>
                <button className="dubbo-view-details">
                  👁️ View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dubbo-display-footer">
        <p>💫 These products were specially selected by Dubbo based on your request!</p>
        <button className="dubbo-show-more" onClick={() => alert('More products coming soon!')}>
          Show More Similar Products
        </button>
      </div>
    </div>
  );
};

export default DubboProductDisplay;
