// Import necessary modules from the "react" library
import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// Create a new context for managing product data
export const CategoriesContext = createContext({
  categoriesMap: [],
});

// Define a provider component for the product data
export const CategoriesProvider = ({ children }) => {
  // Define a state variable to hold the product data
  const [categoriesMap, setCategoriesMap] = useState({});


  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  // Create an object with the product data
  const value = { categoriesMap };

  // Return the provider component, wrapping the children components with the context provider
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
