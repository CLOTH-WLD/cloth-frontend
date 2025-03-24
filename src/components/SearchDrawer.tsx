
import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Input } from './ui/input';
import { X, Search, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types/product';

interface SearchDrawerProps {
  triggerRef: React.RefObject<HTMLInputElement>;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ triggerRef }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch all products for searching
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  // Track drawer open state for proper focus handling
  useEffect(() => {
    setIsDrawerOpen(open);
  }, [open]);

  // Focus the search input after the drawer is fully opened
  useEffect(() => {
    let focusTimeout: NodeJS.Timeout;
    
    if (isDrawerOpen && searchInputRef.current) {
      // Use a longer delay to ensure animation is complete
      focusTimeout = setTimeout(() => {
        if (searchInputRef.current) {
          console.log('Focusing search input');
          searchInputRef.current.focus();
        }
      }, 500); // 500ms delay to ensure animation is complete
    }
    
    return () => {
      if (focusTimeout) clearTimeout(focusTimeout);
    };
  }, [isDrawerOpen]);

  // Handle search when user types
  useEffect(() => {
    if (searchTerm.length >= 2) {
      setIsLoading(true);
      const lowerCaseSearch = searchTerm.toLowerCase();
      
      // Filter products that match the search term
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

  // Handle drawer close
  const handleClose = () => {
    setOpen(false);
    setSearchTerm('');
  };

  // Manual focus handler to ensure focus works
  const handleSheetOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      // Try to focus immediately as a backup
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Input 
          ref={triggerRef}
          placeholder="Search" 
          readOnly
          className="h-12 w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Search component that slides in below the navbar */}
      {open && (
        <div className="fixed inset-x-0 top-[105px] z-50 bg-white shadow-md">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3 p-4 border-b">
              <button onClick={handleClose} aria-label="Close search" className="p-1">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Input 
                ref={searchInputRef}
                placeholder="Search products..."
                className="flex-1 h-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
                autoFocus
              />
            </div>
            
            {/* Search results area with a fixed height */}
            <div className="overflow-y-auto p-4 max-h-[60vh]">
              {isLoading ? (
                <div className="text-center py-6">Searching...</div>
              ) : (
                <>
                  {searchTerm.length < 2 ? (
                    <div className="text-center py-6 text-gray-500">
                      Type at least 2 characters to search
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-6">
                      No products found for "{searchTerm}"
                    </div>
                  ) : (
                    <AnimatePresence>
                      <div className="space-y-4">
                        {searchResults.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link 
                              to={`/product/${product.id}`}
                              className="flex items-center justify-between py-3 w-full group"
                              onClick={handleClose}
                            >
                              <div className="flex items-center gap-3">
                                <Search className="h-5 w-5 text-gray-500 shrink-0" />
                                <span className="font-medium text-black">{product.title}</span>
                              </div>
                              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors shrink-0" />
                            </Link>
                            {index < searchResults.length - 1 && <hr className="border-gray-100" />}
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Overlay to allow clicking outside to close */}
          <div 
            className="fixed inset-0 bg-black/20 -z-10" 
            onClick={handleClose}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default SearchDrawer;
