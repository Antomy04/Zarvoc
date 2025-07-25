import React, { useState } from 'react';

const ShowcaseSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      title: "Revamp your home in style",
      subtitle: "Transform your living space",
      color: "from-orange-500 to-red-500",
      images: [
        "https://i.pinimg.com/736x/25/42/4e/25424e23d2e0923eba2910da3288b7f5.jpg",
        "https://i.pinimg.com/736x/6c/b0/2f/6cb02f988fb34ce7d7eabc85f0650764.jpg",
        "https://i.pinimg.com/736x/03/ee/f7/03eef7ab45ca6b31fbd6ab47d6d6798b.jpg",
        "https://i.pinimg.com/736x/1c/2a/c5/1c2ac57e1177411e2b77dc8ded752be6.jpg"
      ]
    },
    {
      title: "Top mobile accessories",
      subtitle: "Upgrade your tech game",
      color: "from-blue-500 to-purple-500",
      images: [
        "https://i.pinimg.com/736x/c1/1d/20/c11d206e3242c393f8d750ff247051af.jpg",
        "https://i.pinimg.com/736x/1d/62/a5/1d62a595b6ab78f8b69df0369907b088.jpg",
        "https://i.pinimg.com/736x/89/b0/93/89b093ba10cc816ae722c08702acc67a.jpg",
        "https://i.pinimg.com/736x/bb/78/5d/bb785d02c5eea50af03b9a9aef35f9df.jpg"
      ]
    }
  ];

  const advertisements = [
    {
      src: "https://i.pinimg.com/736x/1c/3b/dc/1c3bdccfb2d610b22d80f0bbce3f1232.jpg",
      title: "Summer Collection",
      subtitle: "Up to 70% off"
    },
    {
      src: "https://i.pinimg.com/736x/89/d2/8d/89d28d2640ee549bdcdc88318c091177.jpg",
      title: "Tech Deals",
      subtitle: "Latest gadgets"
    }
  ];

  const tallAd = {
    src: "https://i.pinimg.com/736x/ac/de/e1/acdee10d31e8bcfb367959fe9ce2c6f7.jpg",
    title: "Premium Fashion",
    subtitle: "Exclusive brands"
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Trending Categories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Endless Brands Waiting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover unbeatable deals and exclusive offers on top brands. Shop now and save big on your favorite products!
          </p>
        </div>
      </section>

      {/* Showcase Grid */}
      <div className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Category Cards */}
            {categories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                onMouseEnter={() => setHoveredCard(`category-${categoryIndex}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{category.subtitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {category.images.map((src, i) => (
                      <div
                        key={i}
                        className="relative bg-gray-100 h-32 rounded-2xl overflow-hidden group/img"
                      >
                        <img
                          src={src}
                          alt={`${category.title}-${i}`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${category.color} hover:shadow-lg text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 group-hover:shadow-xl`}>
                    Explore Collection
                    <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Advertisement Column */}
            <div className="space-y-6">
              {advertisements.map((ad, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                  onMouseEnter={() => setHoveredCard(`ad-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ad.src}
                      alt={`advertisement-${i}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">{ad.title}</h4>
                      <p className="text-sm text-gray-200">{ad.subtitle}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-white text-xs font-medium">Featured</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tall Advertisement */}
            <div
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard('tall-ad')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-96 lg:h-full overflow-hidden">
                <img
                  src={tallAd.src}
                  alt="tall-advertisement"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-8 left-6 right-6 text-white">
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-xs font-medium">Exclusive</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{tallAd.title}</h4>
                  <p className="text-gray-200 mb-4">{tallAd.subtitle}</p>
                  <button className="bg-white text-gray-800 px-6 py-2 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                    Shop Now
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4">Ready to Discover More?</h3>
              <p className="text-blue-100 mb-8 text-lg">
                Join thousands of happy customers exploring our curated collections
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                  Browse All Categories
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                  View Deals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;