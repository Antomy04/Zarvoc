// src/components/Category.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Filter, Grid, List, Search, ArrowUp } from "lucide-react";

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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartLoading, setCartLoading] = useState({});
  const [wishlist, setWishlist] = useState(new Set());

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
          setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-8 bg-gray-300 rounded w-20"></div>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {categoryDisplayNames[currentCategory] || currentCategory}
          </h1>
          <p className="text-lg text-gray-600">
            Discover our collection of <span className="font-semibold text-blue-600">{filteredProducts.length}</span> amazing products
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-base min-w-[180px]"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-md" : "hover:bg-gray-200"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-md" : "hover:bg-gray-200"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" 
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}>
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`bg-white rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-[1.03] border border-gray-100 ${
                  viewMode === "list" ? "flex max-h-80" : "flex flex-col h-full min-h-[400px]"
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${viewMode === "list" ? "w-80 flex-shrink-0" : "aspect-square"}`}>
                  <img
                    src={product.image}
                    alt={product.name || "Product"}
                    className={`object-cover group-hover:opacity-95 transition-all duration-300 w-full h-full ${
                      viewMode === "list" ? "" : "rounded-t-3xl"
                    }`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=No+Image";
                    }}
                  />
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 shadow-lg ${
                      wishlist.has(product._id) 
                        ? "bg-red-500 text-white scale-110" 
                        : "bg-white/95 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={wishlist.has(product._id) ? "currentColor" : "none"} />
                  </button>
                  
                  {/* Discount Badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-6 flex-1 flex flex-col ${viewMode === "list" ? "justify-center" : ""}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {product.name || "Product Name"}
                  </h3>
                  
                  {product.description && (
                    <p className="text-base text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2 font-medium">
                        ({product.rating})
                      </span>
                    </div>
                  )}

                  {/* Price and Actions */}
                  <div className="mt-auto">
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{(product.price || 0).toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      disabled={cartLoading[product._id]}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] font-semibold text-base shadow-lg hover:shadow-xl"
                    >
                      {cartLoading[product._id] ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </>
                      )}
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
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;