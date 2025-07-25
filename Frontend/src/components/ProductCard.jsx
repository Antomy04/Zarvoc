import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    const safeName = product.name.replace(/"/g, '&quot;').replace(/'/g, "\\'");
    const safeImage = product.image.replace(/"/g, '&quot;').replace(/'/g, "\\'");
    
    onAddToCart(product._id, safeName, product.price, safeImage);
  };

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
