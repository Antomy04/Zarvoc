import React, { useRef, useState } from 'react';

const products = [
  {
    name: 'Fashions',
    desc: 'High Quality Fabric, Comfortable And Stylish.',
    price: '₹599 / ₹20000',
    image: 'https://th.bing.com/th/id/OIP.9HRk4Cp9xubO5wXOI2sTrQHaLF?w=202&h=302&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    name: 'Classic Game',
    desc: 'Dive into an immersive world of adventure and strategy with this fantastic game. ',
    price: '₹8000',
    image: 'https://th.bing.com/th/id/OIP.qTD0a4E1gXgL-Gsg_COhtAHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    name: 'Bluetooth Speaker',
    desc: 'Experience powerful, crystal-clear sound with this portable Bluetooth speaker.',
    price: '₹6000',
    image: 'https://m.media-amazon.com/images/I/713TUYjagQL.jpg',
  },
  {
    name: 'Branded shoes',
    desc: 'Branded shoes, the perfect balance of fashion and functionality.',
    price: '₹4500 / ₹1.5 lac',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=687&auto=format&fit=crop',
  },
  {
    name: 'Laptop',
    desc: 'Laptops - High Performance Laptops',
    price: '₹55,000',
    image: 'https://i.pinimg.com/736x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg',
  },
  {
    name: 'Smartphone',
    desc: 'Latest smartphone, great camera quality.',
    price: '₹25,000 / ₹2,000,00',
    image: 'https://i.pinimg.com/736x/ce/e9/a3/cee9a3b405bb308569bc26c76d8cfd63.jpg',
  },
  {
    name: 'Headphone',
    desc: 'High quality headphones, great sound experience.',
    price: '₹6,500',
    image: 'https://plus.unsplash.com/premium_photo-1679513691485-711d030f7e94?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Notebook',
    desc: 'Ideal Notebook for Study, for All Subjects.',
    price: '₹150',
    image: 'https://i.pinimg.com/736x/74/d3/e3/74d3e3226cd9e305c74a59439538a5ea.jpg',
  },
];

const BestSellerCard = ({ name, desc, price, image, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <article 
      className={`group min-w-[300px] max-w-sm flex-shrink-0 relative overflow-hidden rounded-3xl 
      bg-white shadow-2xl transition-all duration-500 hover:shadow-gray-400/20 hover:shadow-2xl hover:scale-[1.02] border border-gray-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-300/50 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
        <span className="text-xs font-medium text-green-600">{category}</span>
      </div>

      {/* Image container with enhanced hover effects */}
      <div className="relative overflow-hidden rounded-t-3xl h-56">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/60 via-transparent to-transparent" />
        
        {/* Floating particles effect */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors duration-300">
            {desc}
          </p>
        </div>
        
        {/* Price with enhanced styling */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {price}
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
};
const BestSellers = () => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="w-full py-20 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Enhanced header */}
        <div className="px-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl animate-bounce">🔥</div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-300 via-blue-400 to-black bg-clip-text text-transparent">
              Best Sellers
            </h2>
          </div>
          <p className="text-black text-lg max-w-2xl">
            Discover our most popular products, handpicked by thousands of satisfied customers
          </p>
        </div>

        {/* Products container */}
        <div className="relative px-8">
          <div
            ref={rowRef}
            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            onScroll={checkScrollButtons}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((item, index) => (
              <BestSellerCard key={index} {...item} />
            ))}
          </div>

          {/* Enhanced navigation buttons */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl shadow-2xl z-20 transition-all duration-300 flex items-center justify-center text-xl ${
              canScrollLeft 
                ? 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white hover:shadow-cyan-500/25 hover:scale-110 border border-slate-600' 
                : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700'
            }`}
            aria-label="Previous products"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl shadow-2xl z-20 transition-all duration-300 flex items-center justify-center text-xl ${
              canScrollRight 
                ? 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white hover:shadow-cyan-500/25 hover:scale-110 border border-slate-600' 
                : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700'
            }`}
            aria-label="Next products"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-slate-600 hover:bg-cyan-400 transition-colors duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
