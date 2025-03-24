
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Input } from './ui/input';
import { X, Search, ExternalLink } from 'lucide-react';
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

  // Fetch all products for searching
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative w-full">
          <Input 
            ref={triggerRef}
            placeholder="Search" 
            readOnly
            className="h-12 w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[60vh] max-h-[60vh] p-0 rounded-t-[20px]">
        <div className="h-full flex flex-col overflow-hidden bg-white">
          {/* Search header */}
          <div className="p-4 flex items-center gap-3 border-b sticky top-0 bg-white z-10">
            <SheetClose asChild>
              <button onClick={handleClose} aria-label="Close search" className="p-1">
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
            <Input 
              placeholder="Search products..."
              className="flex-1 h-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              aria-label="Search products"
            />
          </div>
          
          {/* Search results */}
          <div className="flex-1 overflow-y-auto p-4">
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
      </SheetContent>
    </Sheet>
  );
};

export default SearchDrawer;
