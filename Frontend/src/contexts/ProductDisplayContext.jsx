import React, { createContext, useContext, useState } from 'react';

// Create the context
const ProductDisplayContext = createContext();

// Custom hook to use the context
export const useProductDisplay = () => {
  const context = useContext(ProductDisplayContext);
  if (!context) {
    throw new Error('useProductDisplay must be used within a ProductDisplayProvider');
  }
  return context;
};

// Provider component
export const ProductDisplayProvider = ({ children }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayTitle, setDisplayTitle] = useState('');
  const [showDubboProducts, setShowDubboProducts] = useState(false);

  const updateProductDisplay = (products, title = 'Dubbo\'s Recommendations') => {
    setDisplayedProducts(products);
    setDisplayTitle(title);
    setShowDubboProducts(true);
  };

  const hideProductDisplay = () => {
    setShowDubboProducts(false);
    setDisplayedProducts([]);
    setDisplayTitle('');
  };

  const value = {
    displayedProducts,
    displayTitle,
    showDubboProducts,
    updateProductDisplay,
    hideProductDisplay
  };

  return (
    <ProductDisplayContext.Provider value={value}>
      {children}
    </ProductDisplayContext.Provider>
  );
};

export default ProductDisplayContext;
