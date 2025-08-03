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
      <Category />
      <Footer />
    </div>
  );
};

export default CategoryPage;
