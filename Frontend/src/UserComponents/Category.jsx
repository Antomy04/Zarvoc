// src/components/Category.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

const Category = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const params = new URLSearchParams(location.search);
  const categoryKey = params.get("cat");

  useEffect(() => {
    const category = categoryMap[categoryKey];

    if (!category) {
      setError("Invalid category");
      return;
    }

    setCurrentCategory(category);

    fetch(`http://localhost:5000/api/products/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((err) => {
        setError("Failed to fetch products.");
        console.error(err);
      });
  }, [categoryKey]);

  return (
  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {error ? (
      <p className="col-span-full text-red-600 text-center">{error}</p>
    ) : (
      products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden group p-4 transition duration-300 hover:shadow-lg hover:scale-[1.015]"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-2xl mb-4 group-hover:opacity-90"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
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
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm group-hover:opacity-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);
};

export default Category;

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
