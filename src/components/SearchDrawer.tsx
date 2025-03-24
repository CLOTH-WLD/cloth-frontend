
import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types/product';

const SearchDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Filter products based on search query
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      const results = products.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleLinkClick = () => {
    setIsOpen(false);
    setSearchQuery('');
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="cursor-pointer">
          <Search className="w-6 h-6" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] rounded-t-xl">
        <div className="px-4 py-4 max-w-3xl mx-auto w-full">
          <div className="relative">
            <Input
              autoFocus
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search products..."
              className="h-12 w-full pr-10 border-0 border-b-2 border-black rounded-none px-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mt-6 max-h-[65vh] overflow-y-auto">
            <AnimatePresence>
              {searchResults.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {searchResults.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between py-3 border-b border-gray-100 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="w-5 h-5 text-gray-500" />
                        <span className="font-bold text-black">{product.title}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                    </Link>
                  ))}
                </motion.div>
              ) : searchQuery.length >= 2 ? (
                <motion.div 
                  className="text-center py-10 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  No products found for "{searchQuery}"
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
