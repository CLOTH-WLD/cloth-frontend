import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { X, Search, ExternalLink, TrendingUp, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
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
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

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

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 w-full h-[calc(100vh-64px)] mt-16 rounded-none border-none">
        <div className="fixed inset-0 bg-black/40 -z-10" aria-hidden="true" />
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                ref={searchInputRef}
                placeholder="Search products, brands, and categories..."
                className="pl-10 h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-100 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <button 
              onClick={handleClose} 
              className="ml-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : searchTerm.length >= 2 ? (
              <AnimatePresence>
                {searchResults.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Search Results</h3>
                    <div className="grid gap-4">
                      {searchResults.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link 
                            to={`/product/${product.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={handleClose}
                          >
                            {product.image && (
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                                <img 
                                  src={product.image} 
                                  alt={product.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 truncate">{product.title}</p>
                              <p className="text-sm text-gray-500 truncate">{product.category}</p>
                              <p className="text-sm font-semibold mt-1">${product.price.toFixed(2)}</p>
                            </div>
                            <ExternalLink className="h-5 w-5 text-gray-400 shrink-0" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-16 text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-900 mb-1">No products found</p>
                    <p className="text-gray-500">
                      We couldn't find any products matching "{searchTerm}"
                    </p>
                  </div>
                )}
              </AnimatePresence>
            ) : (
              <div className="py-6">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold">Trending Searches</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
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
                        className="flex flex-col items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={handleClose}
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
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
