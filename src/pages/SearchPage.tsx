import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const trendingSearches = ["Summer dresses", "Light jackets", "Linen shirts", "Sandals"];
  const popularCategories = ["Women", "Men", "Kids", "Accessories"];
  
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setIsLoading(true);
      const lowerCaseSearch = searchTerm.toLowerCase();
      
      const filtered = allProducts.filter(product => 
        product.title.toLowerCase().includes(lowerCaseSearch) || 
        product.description.toLowerCase().includes(lowerCaseSearch) ||
        product.category.toLowerCase().includes(lowerCaseSearch)
      );
      
      setSearchResults(filtered);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allProducts]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-8">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cloth-charcoal"></div>
            </div>
          ) : searchTerm.length >= 2 ? (
            <AnimatePresence>
              {searchResults.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-lg font-semibold mb-6">Search Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-xl font-medium text-cloth-charcoal mb-1">
                    No products found
                  </p>
                  <p className="text-gray-500">
                    We couldn't find any products matching "{searchTerm}"
                  </p>
                </div>
              )}
            </AnimatePresence>
          ) : (
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Trending Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-cloth-offwhite hover:bg-cloth-beige rounded-full text-sm transition-colors"
                      onClick={() => setSearchTerm(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {popularCategories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/${category.toLowerCase()}`}
                      className="flex flex-col items-center p-4 bg-cloth-offwhite hover:bg-cloth-beige rounded-lg transition-colors"
                    >
                      <span className="font-medium">{category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
