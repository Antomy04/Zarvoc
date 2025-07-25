import React, { useState } from 'react';

const Promotional = () => {
  const [hoveredBanner, setHoveredBanner] = useState(null);

  const banners = [
    {
      id: 'b1',
      src: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/4be945094f5ac616.jpeg?q=60",
      title: "Mega Electronics Sale",
      subtitle: "Up to 70% Off",
      badge: "Limited Time",
      gridArea: "1 / 1 / 2 / 3",
      size: "large"
    },
    {
      id: 'b2',
      src: "https://rukminim2.flixcart.com/www/1060/1560/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60",
      title: "Fashion Week",
      subtitle: "Trending Styles",
      badge: "New Arrivals",
      gridArea: "2 / 1 / 4 / 2",
      size: "tall"
    },
    {
      id: 'b3',
      src: "https://i.pinimg.com/736x/e1/0a/90/e10a901022ea33daad5f9bb035da7afd.jpg",
      title: "Home & Living",
      subtitle: "Transform Your Space",
      badge: "Best Sellers",
      gridArea: "1 / 3 / 3 / 4",
      size: "tall"
    },
    {
      id: 'b4',
      src: "https://i.pinimg.com/736x/16/8c/71/168c7155ca5256ccdb949133614f136e.jpg",
      title: "Beauty Essentials",
      subtitle: "Glow Up Collection",
      badge: "Featured",
      gridArea: "2 / 2 / 3 / 3",
      size: "medium"
    },
    {
      id: 'b5',
      src: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/74f0ad81e44e6e6f.jpg?q=60",
      title: "Tech Gadgets",
      subtitle: "Latest Innovation",
      badge: "Hot Deals",
      gridArea: "3 / 2 / 4 / 4",
      size: "wide"
    }
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      "Limited Time": "from-red-500 to-pink-500",
      "New Arrivals": "from-green-500 to-emerald-500",
      "Best Sellers": "from-yellow-500 to-orange-500",
      "Featured": "from-purple-500 to-indigo-500",
      "Hot Deals": "from-blue-500 to-cyan-500"
    };
    return colors[badge] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <span className="text-sm font-medium">Special Offers</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Exclusive Promotions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these incredible deals and limited-time offers
          </p>
        </div>

        {/* Promotional Grid */}
        <div 
          className="grid gap-6 h-[600px] md:h-[700px]"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)'
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ gridArea: banner.gridArea }}
              onMouseEnter={() => setHoveredBanner(banner.id)}
              onMouseLeave={() => setHoveredBanner(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={banner.src}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
                {/* Top Section - Badge */}
                <div className="flex justify-between items-start">
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${getBadgeColor(banner.badge)} rounded-full px-4 py-2 backdrop-blur-sm`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs md:text-sm font-bold">{banner.badge}</span>
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Title & CTA */}
                <div className="space-y-4">
                  <div>
                    <h3 className={`font-bold mb-2 ${
                      banner.size === 'large' ? 'text-2xl md:text-4xl' :
                      banner.size === 'tall' ? 'text-xl md:text-2xl' :
                      banner.size === 'wide' ? 'text-xl md:text-3xl' :
                      'text-lg md:text-xl'
                    }`}>
                      {banner.title}
                    </h3>
                    <p className={`text-gray-200 ${
                      banner.size === 'large' ? 'text-lg md:text-xl' :
                      banner.size === 'tall' ? 'text-base md:text-lg' :
                      'text-sm md:text-base'
                    }`}>
                      {banner.subtitle}
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="group/btn bg-white/20 hover:bg-white hover:text-gray-800 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 border border-white/30">
                    <span className="flex items-center gap-2">
                      Shop Now
                      <span className="inline-block transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getBadgeColor(banner.badge)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>

              {/* Animated Corner Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Limited Time Offers</h3>
              <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                These amazing deals won't last long. Grab them before they're gone!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  View All Deals
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105">
                  Set Price Alerts
                </button>
              </div>
            </div>
            
            {/* Decorative floating elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotional;