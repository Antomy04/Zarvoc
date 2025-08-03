// src/components/Category.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Filter, Grid, List, Search, ArrowUp, Menu, X, Sliders } from "lucide-react";

const categoryMap = {
  fashionProducts: "fashion",
  cosmeticProducts: "cosmetic",
  electronic: "electronic",
  furnitureProducts: "furniture",
  kitchenProducts: "kitchen",
  childrenToysProducts: "childrenToys",
  foodProducts: "food",
  sportsProducts: "sports",
};

const categoryDisplayNames = {
  fashion: "Fashion & Apparel",
  cosmetic: "Beauty & Cosmetics",
  electronic: "Electronics",
  furniture: "Furniture",
  kitchen: "Kitchen & Dining",
  childrenToys: "Kids & Toys",
  food: "Food & Beverages",
  sports: "Sports & Fitness",
};

const apiUrl = import.meta.env.VITE_API_URL;

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: Infinity });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartLoading, setCartLoading] = useState({});
  const [wishlist, setWishlist] = useState(new Set());
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minPrice, setMinPrice] = useState(0);

  const params = new URLSearchParams(location.search);
  const categoryKey = params.get("cat");

  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterMenuOpen && !event.target.closest('.filter-menu') && !event.target.closest('.filter-toggle')) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterMenuOpen]);

  // Fetch products
  useEffect(() => {
    const category = categoryMap[categoryKey];

    if (!category) {
      setError("Invalid category");
      setLoading(false);
      return;
    }

    setCurrentCategory(category);
    setLoading(true);
    
    fetch(`${apiUrl}/api/products/${category}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setError("");
        
        // Set initial price range based on products
        if (data.length > 0) {
          const prices = data.map(p => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange({ min, max });
          setTempPriceRange({ min, max });
        }
      })
      .catch((err) => {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryKey]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, priceRange]);

  const addToCart = useCallback(async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to cart.");
      return;
    }

    setCartLoading(prev => ({ ...prev, [product._id]: true }));

    try {
      const response = await fetch(`${apiUrl}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message || data.msg || "Added to cart!");
      } else {
        throw new Error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      alert("Error adding to cart. Please try again.");
      console.error(error);
    } finally {
      setCartLoading(prev => ({ ...prev, [product._id]: false }));
    }
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = () => {
    setPriceRange(tempPriceRange);
    setIsFilterMenuOpen(false);
  };

  const resetFilters = () => {
    const resetRange = { min: minPrice, max: maxPrice };
    setPriceRange(resetRange);
    setTempPriceRange(resetRange);
    setSearchTerm("");
    setSortBy("name");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="animate-pulse">
            <div className="h-6 md:h-8 bg-gray-300 rounded w-48 md:w-64 mb-4 md:mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4">
                  <div className="h-32 md:h-48 bg-gray-300 rounded mb-3 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-2 md:h-3 bg-gray-300 rounded mb-3 md:mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 md:h-4 bg-gray-300 rounded w-12 md:w-16"></div>
                    <div className="h-6 md:h-8 bg-gray-300 rounded w-16 md:w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-4xl md:text-6xl mb-4">😕</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {categoryDisplayNames[currentCategory] || currentCategory}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Discover our collection of {filteredProducts.length} amazing products
          </p>
        </div>

        {/* Mobile Header with Filter Toggle */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="filter-toggle flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Filters and Controls */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Menu Overlay */}
        {isFilterMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterMenuOpen(false)}></div>
            <div className="filter-menu absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-lg transform transition-transform">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Filters & Sort
                </h2>
                <button
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={tempPriceRange.min}
                        onChange={(e) => setTempPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={tempPriceRange.max === Infinity ? "" : tempPriceRange.max}
                        onChange={(e) => setTempPriceRange(prev => ({ ...prev, max: Number(e.target.value) || Infinity }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      Current: ₹{tempPriceRange.min.toLocaleString()} - ₹{tempPriceRange.max === Infinity ? maxPrice.toLocaleString() : tempPriceRange.max.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={applyFilters}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={resetFilters}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Search Bar */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="text-4xl md:text-6xl mb-4">🔍</div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 text-sm md:text-base">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-3 md:gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  viewMode === "list" ? "md:flex" : ""
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${viewMode === "list" ? "md:w-48 md:flex-shrink-0" : ""}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`object-cover group-hover:opacity-90 transition-opacity ${
                      viewMode === "list" ? "w-full h-32 md:h-full" : "w-full h-32 md:h-48"
                    }`}
                  />
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className={`absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 rounded-full transition-colors ${
                      wishlist.has(product._id) 
                        ? "bg-red-500 text-white" 
                        : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart className="w-3 h-3 md:w-4 md:h-4" fill={wishlist.has(product._id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4 flex-1">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-2 md:mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-600 ml-1 md:ml-2">
                        ({product.rating})
                      </span>
                    </div>
                  )}

                  {/* Price and Actions */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg md:text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs md:text-sm text-gray-500 line-through ml-1 md:ml-2 block md:inline">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={cartLoading[product._id]}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-1 md:gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-xs md:text-sm"
                    >
                      {cartLoading[product._id] ? (
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                      )}
                      <span className="font-medium hidden md:inline">
                        {cartLoading[product._id] ? "Adding..." : "Add to Cart"}
                      </span>
                      <span className="font-medium md:hidden">
                        {cartLoading[product._id] ? "..." : "Add"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 md:bottom-6 right-4 md:right-6 bg-blue-600 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 z-40"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;