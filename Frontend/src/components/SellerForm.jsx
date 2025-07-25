import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../UserComponents/Header';
import './SellerForm.css';

const SellerForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('seller-info');
  const [imagePreview, setImagePreview] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    country: '',
    shipping: ''
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

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Check if all fields are filled
    const allFilled = Object.values(updatedFormData).every(field => field.trim() !== '');
    setIsFormValid(allFilled);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/sellers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        // Store seller ID in localStorage for future use
        if (data._id) {
          localStorage.setItem('sellerId', data._id);
          localStorage.setItem('sellerInfo', JSON.stringify(data));
        }
        alert('✅ Seller registered successfully');
        navigate('/product-details'); // Navigate to product details
      } else {
        alert('❌ Error submitting form: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error submitting form');
    }
  };

  return (
    <div className="seller-form-page">
      <Header />
      
      <div className="tabs">
        <div className={`tab ${activeTab === 'seller-info' ? 'active' : ''}`}>
          Seller information
        </div>
        <div className="tab">Product detail</div>
        <div className="tab">Dashboard</div>
      </div>

      <div className="main-content">
        <div className="form-image-row">
          <form className="seller-form" onSubmit={handleSubmit}>
            <h2>Tell us about your business</h2>
            
            <label htmlFor="shopName">Set a name for your shop</label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <label htmlFor="category">Select product category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
             <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label htmlFor="pincode">Pin code</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <label htmlFor="address">Enter your business address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <label htmlFor="shipping">Shipping option</label>
            <input
              type="text"
              id="shipping"
              name="shipping"
              value={formData.shipping}
              onChange={handleInputChange}
              placeholder="Self shipping or partner shipping"
            />

            <button
              type="submit"
              className={`continue-btn ${isFormValid ? 'enabled' : 'disabled'}`}
              disabled={!isFormValid}
            >
              Continue
            </button>
          </form>

          <div className="image-section">
            <div className="image-placeholder">
              {imagePreview ? (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Shop Image"
                    className="preview-image"
                  />
                  <span className="preview-label">Preview</span>
                </div>
              ) : (
                <span className="placeholder-text">Image</span>
              )}
            </div>
            
            <label htmlFor="shopImage" className="upload-label">
              <span className="upload-btn">Upload Shop Image</span>
              <input
                type="file"
                id="shopImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
