
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

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
      symbol: '▿',
      items: ['Men', 'Women', 'Kids', 'Accessories', 'Luggages']
    },
    {
      name: 'Electronics',
      key: 'electronic',
      symbol: '▿',
      items: ['Laptops', 'Tablets', 'Cameras', 'Headphones', 'Smartwatches']
    },
    {
      name: 'Home & Furniture',
      key: 'furnitureProducts',
      symbol: '▿',
      items: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Outdoor']
    },
    {
      name: 'Appliances',
      key: 'kitchenProducts',
      symbol: null,
      items: []
    },
    {
      name: 'Toys',
      key: 'childrenToysProducts',
      symbol: '▿',
      items: ['Action Figures', 'Dolls', 'Puzzles', 'Board Games']
    },
    {
      name: 'Cosmetics',
      key: 'cosmeticProducts',
      symbol: null,
      items: []
    },
    {
      name: 'Kilos',
      key: 'foodProducts',
      symbol: null,
      items: []
    },
    {
      name: 'Sports',
      key: 'sportsProducts',
      symbol: null,
      items: []
    }
  ];

  return (
    <div className="bg-gray-50 font-inter w-full min-w-full">
      <nav className="bg-white w-full min-w-full px-4 py-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-none w-full">
          {/* Logo */}
          <div className="text-3xl font-bold text-blue-700">
            𝓩𝓪𝓻𝓿𝓸𝓬
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-2/3 order-3 md:order-none mx-auto">
            <div className="relative max-w-3xl mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search for products, categories, or ideas..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              />
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 order-2 md:order-none">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 shadow"
              onClick={handleCartClick}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 11-4 0m4 0h-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6 w-full">
          <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-center py-2 px-4 font-semibold shadow-md hover:from-sky-500 hover:to-blue-600 cursor-pointer transition-colors duration-300 w-full">
            <ul className="flex flex-wrap justify-center items-center gap-10 w-full">
              {/* Menu Icon with Dropdown */}
              <li 
                className="inline-block mx-2 relative"
                onMouseEnter={() => setActiveDropdown('menu')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href="/" className="text-white hover:text-gray-200">☰</a>
                {activeDropdown === 'menu' && (
                  <ul className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 z-10 min-w-32">
                    <li className="my-1">
                      <a href="/" className="block px-2 py-1 text-gray-700 hover:text-blue-600">Home</a>
                    </li>
                    <li className="my-1">
                      <a href="/about" className="block px-2 py-1 text-gray-700 hover:text-blue-600">About Us</a>
                    </li>
                    <li className="my-1">
                      <a href="/contact.html" className="block px-2 py-1 text-gray-700 hover:text-blue-600">Contact Us</a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Category Items */}
              {categories.map((category) => (
                <li 
                  key={category.key}
                  className="inline-block mx-2 relative"
                  onMouseEnter={() => category.items.length > 0 && setActiveDropdown(category.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href={`category?cat=${category.key}`}
                    className="text-white hover:text-gray-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category.key);
                    }}
                  >
                    {category.name} {category.symbol}
                  </a>
                  {activeDropdown === category.key && category.items.length > 0 && (
                    <ul className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 z-10 min-w-32">
                      {category.items.map((item, index) => (
                        <li key={index} className="my-1">
                          <a href="#" className="block px-2 py-1 text-gray-700 hover:text-blue-600">{item}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;