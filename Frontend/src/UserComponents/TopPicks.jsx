import React, { useState } from 'react';

const products = [
  {
    title: 'Keep shopping for',
    image: 'https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Purple-5_800x.jpg?v=1727357376',
    price: 199,
    mrp: 999,
    discount: 80,
    category: 'Electronics',
    rating: 4.5,
    reviews: 1250,
    smallImages: [
      'https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Brown-9_800x.jpg?v=1727357396',
      'https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Pink-10_800x.jpg?v=1727357401',
      'https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Dark-Green-8_800x.jpg?v=1727357391',
      'https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Sky-Blue-4_800x.jpg?v=1727357370'
    ]
  },
  {
    title: 'Up to 60% off | Top kitchen essentials available nearby',
    image: 'https://s.alicdn.com/@sc04/kf/A72985e53e4294e76ac33d971b3edef0f8.jpg_720x720q50.jpg',
    price: 749,
    mrp: 1999,
    discount: 63,
    category: 'Kitchen',
    rating: 4.3,
    reviews: 890,
    smallImages: [
      'https://s.alicdn.com/@sc04/kf/Ha69f187a2fb949eb9a0eddd522bd8ba48.jpg_720x720q50.jpg',
      'https://s.alicdn.com/@sc04/kf/H3eddaab0557346c9942fc8805e662606M.jpg_720x720q50.jpg',
      'https://s.alicdn.com/@sc04/kf/Hb9d41cbe8ba34062a6518fac4f436742D.jpg_720x720q50.jpg',
      'https://s.alicdn.com/@sc04/kf/H5f9f7a4b29a247baa7508719a8a1d482z.png_720x720q50.jpg'
    ]
  },
  {
    title: 'Up to 75% off | Get casual ready from Small Businesses',
    image: 'https://i.pinimg.com/736x/ff/aa/2d/ffaa2d1e18872b06e95a4d8b393e6e3a.jpg',
    price: 670,
    mrp: 1999,
    discount: 66,
    category: 'Fashion',
    rating: 4.7,
    reviews: 2340,
    smallImages: [
      'https://i.pinimg.com/736x/b6/52/1e/b6521e1258ab935cf5b4eb705f02610e.jpg',
      'https://i.pinimg.com/@sc04/kf/ee/e8/8e/eee88e5ecfef1a0405edfecc4faa079a.jpg',
      'https://i.pinimg.com/736x/0f/f8/75/0ff875c7298e459964264782da3a0ff1.jpg',
      'https://i.pinimg.com/736x/cb/51/df/cb51dfe6680936620da07eb36f4b5b6b.jpg'
    ]
  }
];

const ProductCard = ({ title, image, price, mrp, discount, category, rating, reviews, smallImages }) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="#FBBF24"/>
              <stop offset="50%" stopColor="#E5E7EB"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Category and discount badges */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
          {category}
        </span>
        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
          {discount}% OFF
        </span>
      </div>

      {/* Wishlist button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 border border-gray-200"
      >
        <svg 
          className={`w-5 h-5 transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400 hover:text-red-500'}`}
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div className="p-6 h-full flex flex-col">
        {/* Title */}
        <div className="h-16 mb-4">
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-3 group-hover:text-emerald-700 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Image container */}
        <div className="relative h-56 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          <img 
            src={selectedImage} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          {/* Image overlay effect */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-medium text-gray-700">{rating}</span>
          <span className="text-sm text-gray-500">({reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{price}
              <sup className="text-sm font-medium">.00</sup>
            </span>
            <span className="text-lg text-gray-500 line-through font-medium">
              ₹{mrp}.00
            </span>
          </div>
          <div className="text-sm text-emerald-600 font-semibold mt-1">
            You save ₹{mrp - price}!
          </div>
        </div>

        {/* Variant images */}
        <div className="flex gap-2 mb-4">
          <img
            src={image}
            alt="Main variant"
            onClick={() => setSelectedImage(image)}
            className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-110 ${
              selectedImage === image ? 'border-emerald-500 shadow-lg' : 'border-gray-200 hover:border-emerald-300'
            }`}
          />
          {smallImages.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Variant ${idx + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                selectedImage === img ? 'border-emerald-500 shadow-lg' : 'border-gray-200 hover:border-emerald-300'
              }`}
            />
          ))}
          {smallImages.length > 3 && (
            <div className="w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50 text-gray-500 text-xs font-medium">
              +{smallImages.length - 3}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-auto space-y-3">
          <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105">
            Add to Cart
          </button>
          <button className="w-full py-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm border border-emerald-200 hover:border-emerald-300 rounded-xl transition-all duration-300 hover:bg-emerald-50">
            See More Details
          </button>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

const TopPicks = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Top Picks For You
            </h2>
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked products based on your preferences and trending items
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
