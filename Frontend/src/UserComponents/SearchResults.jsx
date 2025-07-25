import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  useEffect(() => {
    if (!query) {
      setError("No search query provided.");
      return;
    }
    fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch(() => setError("Failed to fetch search results."));
  }, [query]);

  // Add to Cart handler (same as in Category/ProductCard)
  function addToCart(id, name, price, image) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to cart.");
      return;
    }

    fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId: id,
        name,
        price,
        image,
        qty: 1
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else if (data.msg) {
          alert(data.msg);
        } else {
          alert("Added to cart!");
        }
      })
      .catch(() => alert("Server error while adding to cart"));
  }

  return (
    <>
      <Header />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {error ? (
          <p className="col-span-full text-red-600 text-center">{error}</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain rounded-lg mb-4 bg-white"
                style={{ maxHeight: "300px" }}
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2 text-center">
                {product.description}
              </p>
              {product.rating && (
                <div className="mb-2 text-yellow-500 text-center">
                  ★ {product.rating}
                </div>
              )}
              <div className="flex justify-between items-center w-full">
                <span className="text-black font-bold text-lg">
                  ₹{product.price}
                </span>
                <button
                  onClick={() =>
                    addToCart(
                      product._id,
                      product.name,
                      product.price,
                      product.image
                    )
                  }
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm ml-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;