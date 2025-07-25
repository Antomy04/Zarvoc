import React, { useState } from 'react';

const reviews = [
  {
    name: 'John Doe',
    role: 'Verified Customer',
    text: 'SuperMarket always delivers fresh groceries on time. The variety and quality are unmatched! Their customer service is outstanding.',
    img: 'https://i.pinimg.com/736x/08/1a/03/081a03c39e724087a8152318c4c39d49.jpg',
    rating: 5,
    location: 'New York',
    purchaseDate: '2 weeks ago'
  },
  {
    name: 'Priya Sharma',
    role: 'Premium Member',
    text: 'I love shopping at SuperMarket! The discounts and offers are great, and the service is excellent. Fast delivery every time.',
    img: 'https://i.pinimg.com/736x/53/5e/ca/535eca1fe2ef89daf5d6f51eb93058b4.jpg',
    rating: 5,
    location: 'Mumbai',
    purchaseDate: '1 week ago'
  },
  {
    name: 'Amit Verma',
    role: 'Regular Customer',
    text: 'The customer support at SuperMarket is very responsive. Highly recommended for daily needs! Great product quality.',
    img: 'https://i.pinimg.com/736x/86/bc/f3/86bcf364a2d6328d9b9cd00e4edee2b4.jpg',
    rating: 5,
    location: 'Delhi',
    purchaseDate: '3 days ago'
  },
  {
    name: 'Sara Lee',
    role: 'Gold Member',
    text: 'Great experience every time! SuperMarket makes grocery shopping easy and convenient. Love the mobile app interface.',
    img: 'https://i.pinimg.com/736x/38/24/3e/38243e5bcf61681efd377c461f19fde7.jpg',
    rating: 5,
    location: 'California',
    purchaseDate: '5 days ago'
  }
];

const CustomerReview = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating 
            ? 'text-yellow-400 drop-shadow-sm' 
            : 'text-gray-300'
        } transition-colors duration-300`}
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          animation: `starTwinkle 2s ease-in-out infinite ${index * 0.2}s`
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 py-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Customer Stories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-green-600 to-emerald-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily needs
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/50 overflow-hidden"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                minHeight: '320px',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Profile Image */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                    <img 
                      src={review.img} 
                      alt={review.name} 
                      className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-8 relative">
                {/* Customer Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {review.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {review.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                    <span>📍 {review.location}</span>
                    <span>🕒 {review.purchaseDate}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed line-clamp-4 group-hover:text-gray-700 transition-colors duration-300">
                  "{review.text}"
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Verified Purchase
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-6xl text-blue-500/10 font-serif">"</div>
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                Write a Review
              </button>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes starTwinkle {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.8; 
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerReview;