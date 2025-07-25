import { useState, useEffect } from 'react';
import './PricingAssistant.css';

const PricingAssistant = ({ product, onClose, onPriceUpdate }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [competitors, setCompetitors] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (product) {
      analyzePricing();
    }
  }, [product]);

  const analyzePricing = async () => {
    setLoading(true);
    try {
      // Fetch competitor products
      const response = await fetch(`${apiUrl}/api/products/analyze-pricing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          category: product.category,
          currentPrice: product.price,
          sellerId: product.sellerId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCompetitors(data.competitors);
        setAnalysis(data.analysis);
      }
    } catch (error) {
      console.error('Error analyzing pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceRecommendation = () => {
    if (!competitors.length) return null;

    const prices = competitors.map(c => c.price);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // AI Logic for pricing strategy
    let recommendation = {};
    
    if (product.price > maxPrice) {
      recommendation = {
        strategy: 'REDUCE_PRICE',
        suggestedPrice: Math.round(avgPrice * 0.95),
        reason: 'Your price is higher than all competitors. Consider reducing to increase competitiveness.',
        urgency: 'high'
      };
    } else if (product.price < minPrice) {
      recommendation = {
        strategy: 'INCREASE_PRICE',
        suggestedPrice: Math.round(minPrice * 0.98),
        reason: 'Your price is lower than all competitors. You can increase price while staying competitive.',
        urgency: 'medium'
      };
    } else if (product.price > avgPrice * 1.1) {
      recommendation = {
        strategy: 'SLIGHT_REDUCE',
        suggestedPrice: Math.round(avgPrice),
        reason: 'Your price is above average. Consider matching the average price for better sales.',
        urgency: 'medium'
      };
    } else if (product.price < avgPrice * 0.9) {
      recommendation = {
        strategy: 'SLIGHT_INCREASE',
        suggestedPrice: Math.round(avgPrice * 0.95),
        reason: 'Your price is below average. You can increase it slightly without losing competitiveness.',
        urgency: 'low'
      };
    } else {
      recommendation = {
        strategy: 'OPTIMAL',
        suggestedPrice: product.price,
        reason: 'Your price is well-positioned in the market. Current pricing is competitive.',
        urgency: 'none'
      };
    }

    return {
      ...recommendation,
      marketStats: {
        average: Math.round(avgPrice),
        minimum: minPrice,
        maximum: maxPrice,
        competitorCount: competitors.length
      }
    };
  };

  const recommendation = getPriceRecommendation();

  const handleApplySuggestion = async () => {
    if (!recommendation || recommendation.strategy === 'OPTIMAL') {
      alert('No price change needed - your price is already optimal!');
      return;
    }

    const confirmMessage = `Are you sure you want to update the price from ₹${product.price} to ₹${recommendation.suggestedPrice}?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        // Update product price in database
        const response = await fetch(`${apiUrl}/api/products/${product._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price: recommendation.suggestedPrice,
            sellerId: product.sellerId
          })
        });

        if (response.ok) {
          const updatedProduct = await response.json();
          alert(`✅ Price updated successfully! New price: ₹${recommendation.suggestedPrice}`);
          
          // Update the product in parent component
          if (onPriceUpdate) {
            onPriceUpdate(updatedProduct);
          }
          
          // Re-analyze with new price
          product.price = recommendation.suggestedPrice;
          analyzePricing();
          
        } else {
          const errorData = await response.json();
          alert(`❌ Failed to update price: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error updating price:', error);
        alert('❌ Failed to update price. Please try again.');
      }
    }
  };

  return (
    <div className="pricing-assistant-overlay">
      <div className="pricing-assistant">
        <div className="assistant-header">
          <div className="robot-icon">🤖</div>
          <h3>AI Pricing Assistant</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="product-info">
          <h4>{product.name}</h4>
          <p>Current Price: ₹{product.price}</p>
          <p>Category: {product.category}</p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="robot-thinking">🤖💭</div>
            <p>Analyzing competitor prices...</p>
          </div>
        ) : (
          <>
            {competitors.length > 0 ? (
              <>
                <div className="market-analysis">
                  <h4>📊 Market Analysis</h4>
                  <div className="stats-grid">
                    <div className="stat">
                      <span className="label">Competitors Found:</span>
                      <span className="value">{recommendation?.marketStats.competitorCount}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Average Price:</span>
                      <span className="value">₹{recommendation?.marketStats.average}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Price Range:</span>
                      <span className="value">₹{recommendation?.marketStats.minimum} - ₹{recommendation?.marketStats.maximum}</span>
                    </div>
                  </div>
                </div>

                <div className="recommendation-section">
                  <h4>🎯 AI Recommendation</h4>
                  <div className={`recommendation ${recommendation?.urgency}`}>
                    <div className="strategy-badge">
                      {recommendation?.strategy.replace('_', ' ')}
                    </div>
                    <div className="suggested-price">
                      Suggested Price: <strong>₹{recommendation?.suggestedPrice}</strong>
                    </div>
                    <p className="reason">{recommendation?.reason}</p>
                    
                    {recommendation?.strategy !== 'OPTIMAL' && (
                      <div className="price-impact">
                        <span className="impact-label">Potential Impact:</span>
                        <span className={`impact-value ${recommendation?.suggestedPrice > product.price ? 'positive' : 'negative'}`}>
                          {recommendation?.suggestedPrice > product.price ? '+' : ''}
                          ₹{Math.abs(recommendation?.suggestedPrice - product.price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="competitors-list">
                  <h4>🏪 Competitor Analysis</h4>
                  <div className="competitors-grid">
                    {competitors.slice(0, 5).map((competitor, index) => (
                      <div key={index} className="competitor-card">
                        <div className="competitor-name">{competitor.name}</div>
                        <div className="competitor-price">₹{competitor.price}</div>
                        <div className={`price-comparison ${competitor.price > product.price ? 'higher' : competitor.price < product.price ? 'lower' : 'same'}`}>
                          {competitor.price > product.price ? '↑ Higher' : 
                           competitor.price < product.price ? '↓ Lower' : '= Same'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    className="apply-suggestion-btn"
                    onClick={handleApplySuggestion}
                    disabled={recommendation?.strategy === 'OPTIMAL'}
                  >
                    {recommendation?.strategy === 'OPTIMAL' 
                      ? '✅ Price is Already Optimal' 
                      : `Apply Suggested Price (₹${recommendation?.suggestedPrice})`
                    }
                  </button>
                  <button className="refresh-analysis-btn" onClick={analyzePricing}>
                    🔄 Refresh Analysis
                  </button>
                </div>
              </>
            ) : (
              <div className="no-competitors">
                <div className="robot-icon">🤖</div>
                <h4>No Competitors Found</h4>
                <p>Great news! You're the only seller in this category with this product name.</p>
                <p>You have pricing flexibility, but consider market demand and your costs.</p>
                <div className="pricing-tips">
                  <h5>💡 Pricing Tips:</h5>
                  <ul>
                    <li>Research similar products in related categories</li>
                    <li>Consider your target profit margin</li>
                    <li>Test different price points</li>
                    <li>Monitor customer response</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PricingAssistant;
