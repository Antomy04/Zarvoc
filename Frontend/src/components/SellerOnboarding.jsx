
import Header from '../UserComponents/Header';
import Footer from './Footer';
import './SellerOnboarding.css';
import { useNavigate } from 'react-router-dom';

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const handleStartSelling = () => {
    navigate('/Seller-form');
  };

  return (
    <div>
      <Header />
      <div className="seller-onboarding-container">
        <div className="banner">
          <img 
            src="https://img.freepik.com/premium-vector/work-from-home-concept-happy-woman-selling-products-online-home_218660-278.jpg?w=1380" 
            alt="Ads" 
          />
        </div>
        
        <h2 className="seller-title">How to become a seller</h2>
        
        <div className="steps">
          <div className="step-card">
            <div className="step-title">Step 1: Register your account</div>
            <div className="step-image">
              <img 
                src="https://i.pinimg.com/736x/d8/8f/a4/d88fa43aa79db7dfd147f459b4c71d00.jpg" 
                alt="Register Account" 
              />
            </div>
          </div>
          
          <div className="step-card">
            <div className="step-title">Step 2: Choose storage & shipping</div>
            <div className="step-image">
              <img 
                src="https://i.pinimg.com/736x/38/bd/e2/38bde2763e83f705839b7eb1ccca4178.jpg" 
                alt="Storage and Shipping" 
              />
            </div>
          </div>
          
          <div className="step-card">
            <div className="step-title">Step 3: List your products</div>
            <div className="step-image">
              <img 
                src="https://i.pinimg.com/736x/91/7a/37/917a37e331d38bdeadad76e10abaf29a.jpg" 
                alt="List Products" 
              />
            </div>
          </div>
          
          <div className="step-card">
            <div className="step-title">Step 4: Complete orders & get paid</div>
            <div className="step-image">
              <img 
                src="https://i.pinimg.com/736x/d1/4e/ff/d14eff0a928847d42b7a86ccb93a6d26.jpg" 
                alt="Get Paid" 
              />
            </div>
          </div>
        </div>
        
        <button className="start-btn" onClick={handleStartSelling}>
          Start selling
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SellerOnboarding;
