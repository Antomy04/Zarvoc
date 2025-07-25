import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const [activeButton, setActiveButton] = useState('user');
  const navigate = useNavigate();

  const handleUserClick = () => {
    setActiveButton('user');
    navigate('/');
  };

  const handleSellerClick = () => {
    setActiveButton('seller');
    navigate('/seller-onboarding');
  };

  return (
    <div className="user-page-container">
      <div className="container">
        <div className="panel left-panel">
          <h1>Welcome!</h1>
          <div className="button-group">
            <button 
              className={activeButton === 'user' ? 'active' : ''} 
              onClick={handleUserClick}
            >
              User
            </button>
            <button 
              className={activeButton === 'seller' ? 'active' : ''} 
              onClick={handleSellerClick}
            >
              Seller
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <h2>Your Journey Starts Here!</h2>
          <p>Explore amazing products and exclusive offers. Your next great find is just a click away!</p>
          <div className="call-to-action-box">
            Great Deals Await!
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
