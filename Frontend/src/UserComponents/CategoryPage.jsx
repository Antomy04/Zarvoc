import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Category from './Category';
import './CategoryPage.css';

const CategoryPage = () => {
  return (
    <div className="category-page">
      {/* Header/Navbar */}
      <Header />
      
      {/* Main Content - Category Products */}
      <main className="category-main">
        <div className="category-container">
          <Category />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;
