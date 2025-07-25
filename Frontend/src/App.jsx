import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserPage from './components/UserPage';
import HomePage from './pages/HomePage';
import About from './pages/About';
import SellerDashboard from './components/SellerDashboard';
import SellerOnboarding from './components/SellerOnboarding';
import SellerForm from './components/SellerForm';
import ProductDetails from './components/ProductDetails';
import CategoryPage from './UserComponents/CategoryPage';
import CartPage from './UserComponents/CartPage';
import Checkout from './UserComponents/Checkout';
import Confirmation from './UserComponents/Confirmation';
import SearchResults from './UserComponents/SearchResults';
import AIAssistant from './components/AIAssistant';
import { ProductDisplayProvider } from './contexts/ProductDisplayContext';
import Contact from './pages/Contact'
import './App.css';

function App() {
  return (
    <ProductDisplayProvider>
      <Router>
        <Routes>
          <Route path="/userpage" element={<UserPage />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/userpage" element={<UserPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-onboarding" element={<SellerOnboarding />} />
          <Route path="/seller-form" element={<SellerForm />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <AIAssistant />
      </Router>
    </ProductDisplayProvider>
  );
}

export default App;
