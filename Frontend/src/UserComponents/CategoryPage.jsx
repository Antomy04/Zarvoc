import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Category from './Category';
import './CategoryPage.css';

const CategoryPage = () => {
  return (
    <>
      {/* Header/Navbar */}
      <Header />
      <Category />
      <Footer />
    </>
  );
};

export default CategoryPage;
