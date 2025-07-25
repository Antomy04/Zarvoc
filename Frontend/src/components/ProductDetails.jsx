import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../UserComponents/Header';
import './ProductDetails.css';

const ProductDetails = () => {
  const [formData, setFormData] = useState({
    'product-name': '',
    'product-category': '',
    'product-description': '',
    'product-amount': '',
    'product-price': '',
    'product-image': '',
    'delivery-charge': ''
  });

const categories = [
  "fashion",
  "cosmetic",
  "electronic",
  "furniture",
  "kitchen",
  "childrentoys",
  "food",
  "sports",
  ];
  
  const [products, setProducts] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const requiredFields = [
    'product-name', 'product-category', 'product-description', 'product-amount', 'product-price'
  ];

  // Check form validation
  useEffect(() => {
    const filled = requiredFields.every(field => formData[field]?.trim());
    setIsFormValid(filled);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Get seller ID from localStorage
    const sellerId = localStorage.getItem('sellerId') || localStorage.getItem('userId');
    
    const productData = {
      name: formData['product-name'].trim(),
      category: formData['product-category'].trim(),
      description: formData['product-description'].trim(),
      amount: formData['product-amount'].trim(),
      price: formData['product-price'].trim(),
      image: formData['product-image'].trim(),
      delivery: formData['delivery-charge'].trim(),
      sellerId: sellerId // Add seller ID to associate product with seller
    };

    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const data = await response.json();
      console.log('✅ Saved:', data);
      
      setProducts(prev => [...prev, data]);

      setFormData({
        'product-name': '',
        'product-category': '',
        'product-description': '',
        'product-amount': '',
        'product-price': '',
        'product-image': '',
        'delivery-charge': ''
      });
    } catch (err) {
      console.error('❌ Error:', err);
    }
  };

  const removeProduct = (index) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    if (!products.length) {
      alert('Please add at least one product before finishing.');
      return;
    }
    navigate('/seller-dashboard');
  };

  return (
    <div className="product-details-page">
      <Header />
      
      <div className="tabs">
        <button className="tab-button">
          <div className="tab">Seller information</div>
        </button>
        <button className="tab-button">
          <div className="tab active">Product detail</div>
        </button>
        <button className="tab-button">
          <div className="tab">Dashboard</div>
        </button>
      </div>

      <div className="main-content">
        <div className="product-form-container">
          <div className="form-header">Product to sell</div>
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-name">Add product</label>
                <input
                  type="text"
                  id="product-name"
                  name="product-name"
                  value={formData['product-name']}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-category">Add product category</label>
                <select
                  id="product-category"
                  name="product-category"
                  value={formData['product-category']}
                  onChange={handleInputChange}
                  required
                  className="input-style"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{flex: 2}}>
                <label htmlFor="product-description">Add product description</label>
                <textarea
                  id="product-description"
                  name="product-description"
                  value={formData['product-description']}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-amount">Add product amount</label>
                <input
                  type="number"
                  id="product-amount"
                  name="product-amount"
                  min="1"
                  value={formData['product-amount']}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-price">Add product price</label>
                <input
                  type="number"
                  id="product-price"
                  name="product-price"
                  min="0"
                  step="0.01"
                  value={formData['product-price']}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{flex: 2}}>
                <label htmlFor="product-image">Add product image</label>
                <input
                  type="text"
                  id="product-image"
                  name="product-image"
                  placeholder="Image URL"
                  value={formData['product-image']}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{flex: 2}}>
                <label htmlFor="delivery-charge">Delivery charge</label>
                <input
                  type="text"
                  id="delivery-charge"
                  name="delivery-charge"
                  placeholder="Free or include delivery charges"
                  value={formData['delivery-charge']}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className={`add-btn ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid}
            >
              + Add more item
            </button>
          </form>
        </div>

        <div className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <strong>Product:</strong> {product.name}<br />
              <strong>Category:</strong> {product.category}<br />
              <strong>Description:</strong> {product.description}<br />
              <strong>Amount:</strong> {product.amount}<br />
              <strong>Price:</strong> ₹{product.price}<br />
              <strong>Image:</strong> {product.image ? 
                <img src={product.image} alt="Product" onError={(e) => {e.target.style.display = 'none'}} /> : 'N/A'
              }<br />
              <strong>Delivery:</strong> {product.delivery}
              <button 
                className="remove-btn" 
                type="button"
                onClick={() => removeProduct(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button 
          className="add-btn finish-btn"
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
