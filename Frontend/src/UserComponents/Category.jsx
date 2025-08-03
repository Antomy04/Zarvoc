// src/components/Category.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";

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
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("");
  const [cartLoading, setCartLoading] = useState({});

  const params = new URLSearchParams(location.search);
  const categoryKey = params.get("cat");

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
        setError("");
      })
      .catch((err) => {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryKey]);

  const addToCart = async (product) => {
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-20">
          <div className="text-2xl">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-20">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryDisplayNames[currentCategory] || currentCategory}
        </h1>
        <p className="text-gray-600">
          Discover our collection of {products.length} amazing products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name || "Product"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
                }}
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name || "Product Name"}
              </h3>
              
              {product.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-3">
                <span className="text-xl font-bold text-gray-900">
                  ₹{(product.price || 0).toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                disabled={cartLoading[product._id]}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cartLoading[product._id] ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;