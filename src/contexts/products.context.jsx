// Import necessary modules from the "react" library
import { createContext, useState } from "react";

// Import the product data from the JSON file
import PRODUCTS from '../shop-data.json';

// Create a new context for managing product data
export const ProductsContext = createContext({
  products: [], // Initial value of the context is an empty array
});

// Define a provider component for the product data
export const ProductsProvider = ({ children }) => {
  // Define a state variable to hold the product data
  const [products, setProducts] = useState(PRODUCTS);

  // Create an object with the product data
  const value = { products };

  // Return the provider component, wrapping the children components with the context provider
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
