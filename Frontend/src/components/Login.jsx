import { useState } from 'react';
import LottieAnimation from './LottieAnimation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPasswordSignin, setShowPasswordSignin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [signinError, setSigninError] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const isValidEmailOrMobile = (input) =>
    /^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(input) || /^\d{10}$/.test(input);

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');

    if (!isValidEmailOrMobile(signupData.email)) {
      setSignupError('Invalid email or mobile number');
      return;
    }

    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/signup', {
        email: signupData.email,
        password: signupData.password
      });

      alert(res.data.msg);
      if (res.status === 200) {
        setActiveTab('signin');
      }
    } catch (error) {
      setSignupError(error.response?.data?.msg || 'Signup failed');
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setSigninError('');

    if (!isValidEmailOrMobile(signinData.email)) {
      setSigninError('Invalid email or mobile number');
      return;
    }

    if (signinData.password.length < 6) {
      setSigninError('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/signin', {
        email: signinData.email,
        password: signinData.password
      });

      localStorage.setItem('userId', res.data.userId);
      if (res.data.role === 'seller') {
        navigate('/sellerpage');
      } else {
        navigate('/userpage');
      }
    } catch (error) {
      setSigninError(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full bg-white">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white flex flex-col justify-center items-center p-12">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Your Journey Starts Here</h2>
          <p className="text-lg text-center mb-8 font-medium opacity-90">
            Sign in or sign up to explore amazing products and exclusive offers.
          </p>
          {/* Lottie Animation */}
          <div className="flex justify-center mb-6">
            <LottieAnimation style={{ width: 220, height: 220 }} />
          </div>
          <img
            src="https://placehold.co/320x180/ffffff/007bff?text=Great+Deals+Await!"
            alt="Banner"
            className="rounded-xl shadow-xl border-4 border-white"
          />
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 flex flex-col justify-center relative">
          <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Welcome!</h1>
          <div className="flex justify-center mb-8 gap-2">
            <button
              className={`px-7 py-2 rounded-l-lg font-semibold shadow-sm transition-all duration-200 ${
                activeTab === 'signup'
                  ? 'bg-blue-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
            <button
              className={`px-7 py-2 rounded-r-lg font-semibold shadow-sm transition-all duration-200 ${
                activeTab === 'signin'
                  ? 'bg-blue-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
          </div>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignin} className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-100 placeholder-gray-400 shadow-sm"
                  value={signinData.email}
                  onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                  placeholder="Enter your email or mobile number"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Password</label>
                <input
                  type={showPasswordSignin ? 'text' : 'password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-100 placeholder-gray-400 shadow-sm"
                  value={signinData.password}
                  onChange={(e) =>
                    setSigninData({ ...signinData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                />
                <label className="text-sm mt-2 inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="mr-2 accent-blue-600"
                    checked={showPasswordSignin}
                    onChange={(e) => setShowPasswordSignin(e.target.checked)}
                  />
                  Show Password
                </label>
              </div>
              {signinError && <div className="text-red-500 text-sm text-center font-semibold">{signinError}</div>}
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md">
                Login
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-100 placeholder-gray-400 shadow-sm"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="Enter your email or mobile number"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Set Password</label>
                <input
                  type={showPasswordSignup ? 'text' : 'password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-100 placeholder-gray-400 shadow-sm"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type={showPasswordSignup ? 'text' : 'password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-100 placeholder-gray-400 shadow-sm"
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({ ...signupData, confirmPassword: e.target.value })
                  }
                  placeholder="Re-enter your password"
                />
                <label className="text-sm mt-2 inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="mr-2 accent-blue-600"
                    checked={showPasswordSignup}
                    onChange={(e) => setShowPasswordSignup(e.target.checked)}
                  />
                  Show Password
                </label>
              </div>
              {signupError && <div className="text-red-500 text-sm text-center font-semibold">{signupError}</div>}
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
