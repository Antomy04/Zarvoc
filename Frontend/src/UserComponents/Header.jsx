import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  Bars3Icon,
  HomeIcon,
  UserGroupIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Zarvoc from '../../public/Zarvoc.png'

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userId');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/notifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${apiUrl}/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      setNotifications(prev => 
        prev.map(n => 
          n._id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      await fetch(`${apiUrl}/api/notifications/clear`, {
        method: 'DELETE'
      });
      setNotifications([]);
      setUnreadCount(0);
      setShowNotifications(false);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);


  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleCategoryClick = (category) => {
    navigate(`/category?cat=${category}`);
  };

  const categories = [
    {
      name: 'Fashion',
      key: 'fashionProducts',
      symbol: '▾',
      items: ['Men', 'Women', 'Kids', 'Accessories', 'Luggages'],
    },
    {
      name: 'Electronics',
      key: 'electronic',
      symbol: '▾',
      items: ['Laptops', 'Tablets', 'Cameras', 'Headphones', 'Smartwatches'],
    },
    {
      name: 'Home & Furniture',
      key: 'furnitureProducts',
      symbol: '▾',
      items: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Outdoor'],
    },
    {
      name: 'Appliances',
      key: 'kitchenProducts',
      symbol: null,
      items: [],
    },
    {
      name: 'Toys',
      key: 'childrenToysProducts',
      symbol: '▾',
      items: ['Action Figures', 'Dolls', 'Puzzles', 'Board Games'],
    },
    {
      name: 'Cosmetics',
      key: 'cosmeticProducts',
      symbol: null,
      items: [],
    },
    {
      name: 'Kilos',
      key: 'foodProducts',
      symbol: null,
      items: [],
    },
    {
      name: 'Sports',
      key: 'sportsProducts',
      symbol: null,
      items: [],
    }
  ];

  return (
    <div className="bg-gradient-to-br  text-black shadow-xl font-inter">
      <nav className="px-4 py-4 w-full">
        <div className="flex flex-wrap items-center justify-between">
         <div
          className="cursor-pointer flex items-center"
          onClick={() => navigate('/')}
          title="Go to Home"
        >
          <img
            src={Zarvoc}
            alt="Zarvoc Logo"
            className="h-12 w-auto object-contain rounded-full"
            style={{ maxHeight: '48px' }}
          />
          <div className="ml-3 text-3xl font-extrabold tracking-wide text-black cursor-pointer">
            Zarvoc
          </div>
        </div>

          {/* Search */}
          <div className="w-full md:w-1/2 order-3 md:order-none my-3 md:my-0">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search products or categories..."
                className="w-full pl-12 pr-4 py-2 bg-white rounded-full bg-gray-800 text-black placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!isLoggedIn ? (
              
              <button
                title="Login"
                onClick={() => navigate('/Login')}
                className="p-2 rounded-full bg-black text-white from-black-600 to-indigo-600"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </button>
            ) : (
              <>
              <button
                title="Logout"
                onClick={handleLogout}
                className="p-2 rounded-full bg-black text-white from-black-600 to-pink-600"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </button>
              <div className="relative notification-dropdown">
                  <button
                    title="Notifications"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full bg-gradient-to-r text-white from-black-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 relative"
                  >
                    <BellIcon className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                      <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-white font-semibold">Notifications</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs text-cyan-400 hover:text-cyan-300"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">
                          No notifications yet
                        </div>
                      ) : (
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification._id}
                              className={`p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                                !notification.read ? 'bg-gray-750' : ''
                              }`}
                              onClick={() => markAsRead(notification._id)}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-gray-300'}`}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(notification.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full ml-2 mt-1"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                </>
            )}
            <button
              title="Cart"
              onClick={handleCartClick}
              className="p-2 rounded-full bg-black text-white from-black-500 to-teal-600 "
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6 w-full">
          <ul className="flex flex-wrap justify-center items-center gap-8 font-semibold text-sm tracking-wide">
            <li
              onClick={() => {
                if(activeDropdown === 'menu'){
                  setActiveDropdown(null)
                } else {
                  setActiveDropdown('menu')
                }
              }}
              // onMouseLeave={() => setActiveDropdown(null)}
              className="relative"
            >
              <Bars3Icon className="h-6 w-6 cursor-pointer hover:text-cyan-400" />
              {activeDropdown === 'menu' && (
                <ul className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 min-w-32 p-2 text-sm">
                  <li><a href="/" className="block px-3 py-1 hover:text-cyan-400 flex items-center"><HomeIcon className="h-4 w-4 mr-1" /> Home</a></li>
                  <li><a href="/about" className="block px-3 py-1 hover:text-cyan-400 flex items-center"><UserGroupIcon className="h-4 w-4 mr-1" /> About</a></li>
                  <li><a href="/contact.html" className="block px-3 py-1 hover:text-cyan-400 flex items-center"><PhoneIcon className="h-4 w-4 mr-1" /> Contact</a></li>
                </ul>
              )}
            </li>

            {categories.map((category) => (
              <li
                key={category.key}
                onMouseEnter={() => category.items.length > 0 && setActiveDropdown(category.key)}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative cursor-pointer hover:text-cyan-400"
              >
                <span onClick={() => handleCategoryClick(category.key)}>
                  {category.name} {category.symbol}
                </span>
                {activeDropdown === category.key && category.items.length > 0 && (
                  <ul className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 min-w-32 p-2 text-sm">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="hover:text-cyan-400 px-3 py-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
