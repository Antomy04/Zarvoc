import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';

const products = [
  {
    name: "Wireless Headphones",
    desc: "Noise-cancelling with 30 hours battery life.",
    img: "https://i.pinimg.com/736x/8c/db/e1/8cdbe123010c380e20f264a8fdd57938.jpg",
    price: "$129.99",
    rating: 4.8,
    category: "Electronics"
  },
  {
    name: "Fitness Band",
    desc: "Track workouts, sleep, and heart rate.",
    img: "https://i.pinimg.com/736x/d4/39/13/d43913c7eba213b38eff4bbd8812303b.jpg",
    price: "$89.99",
    rating: 4.6,
    category: "Health"
  },
  {
    name: "4K Smart TV",
    desc: "Smart apps and vibrant visuals.",
    img: "https://i.pinimg.com/736x/b7/0d/aa/b70daaa7cbd8b252c63ef180eb5e1608.jpg",
    price: "$599.99",
    rating: 4.9,
    category: "Electronics"
  },
  {
    name: "Office Chair",
    desc: "Ergonomic and breathable for long workdays.",
    img: "https://i.pinimg.com/736x/7a/3c/5c/7a3c5ca272bf8f2e4b2ad7c0f2d97632.jpg",
    price: "$249.99",
    rating: 4.7,
    category: "Furniture"
  },
  {
    name: "Analog Watch",
    desc: "Minimalist leather strap wristwatch.",
    img: "https://i.pinimg.com/736x/9f/28/ec/9f28ecf9eb6d0aa6d8273d2070444b95.jpg",
    price: "$199.99",
    rating: 4.5,
    category: "Fashion"
  },
  {
    name: "Portable Blender",
    desc: "Rechargeable on-the-go smoothie maker.",
    img: "https://i.pinimg.com/736x/0e/3a/ae/0e3aae87c04d0bb998d1fdc069596eab.jpg",
    price: "$59.99",
    rating: 4.4,
    category: "Kitchen"
  },
  {
    name: "LED Strip Lights",
    desc: "Smart multicolor ambiance with remote.",
    img: "https://i.pinimg.com/736x/36/1f/f8/361ff84684094557c5c5e42e3fd8e761.jpg",
    price: "$39.99",
    rating: 4.3,
    category: "Home"
  },
  {
    name: "Eco Water Bottle",
    desc: "Reusable and keeps cold for 24 hrs.",
    img: "https://i.pinimg.com/736x/b3/9b/f4/b39bf4589291b85da295b735dc8c1336.jpg",
    price: "$24.99",
    rating: 4.6,
    category: "Lifestyle"
  },
  {
    name: "Charging Stand",
    desc: "Wireless fast charging dock.",
    img: "https://i.pinimg.com/736x/f5/9d/00/f59d0051f94b71d26500529a02c018d3.jpg",
    price: "$44.99",
    rating: 4.5,
    category: "Electronics"
  },
  {
    name: "Gaming Mouse",
    desc: "RGB lighting with adjustable DPI.",
    img: "https://i.pinimg.com/736x/65/84/17/6584175af17d1067d0259f42611d15aa.jpg",
    price: "$79.99",
    rating: 4.8,
    category: "Gaming"
  }
];

const TrendingSection = () => {
  const scrollRef = useRef(null);
  const [favorites, setFavorites] = useState(new Set());

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth'
      });
    }
  };

  const toggleFavorite = (index) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(index)) {
      newFavorites.delete(index);
    } else {
      newFavorites.add(index);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span className="text-sm font-medium">Trending Now</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Step into Style
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Discover the hottest trends taking social media by storm. Exclusive collections, unbeatable prices.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Trending Products Section */}
      <div className="relative -mt-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative group bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Trending Products</h2>
                  <p className="text-gray-600">Most loved items this week</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => scroll('left')}
                    className="group/btn p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="group/btn p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="group min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(index)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-colors duration-300 ${
                            favorites.has(index) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600 hover:text-red-500'
                          }`} 
                        />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-500">2.3k reviews</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.desc}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-800">
                          {product.price}
                        </div>
                        <button className="group/cart bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span className="text-sm font-medium">Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3 className="text-4xl font-bold mb-4">Ready to Shop?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join millions of happy customers and discover why these products are trending everywhere.
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Explore All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;