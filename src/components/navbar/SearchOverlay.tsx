
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Product } from '@/types/product';
import { getAllProducts } from '@/services/productService';

interface SearchOverlayProps {
  isActive: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isActive, 
  onClose,
  searchTerm,
  onSearchChange
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    
    if (isActive) {
      setIsClosing(false);
      fetchProducts();
    }
  }, [isActive]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts([]);
      return;
    }
    
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, products]);
  
  // Add effect to handle animation state
  useEffect(() => {
    // If the overlay is not active and not in closing state, reset closing state
    if (!isActive && isClosing) {
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300); // Match animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isActive, isClosing]);

  // Don't render anything if not active and not closing
  if (!isActive && !isClosing) {
    return null;
  }

  const handleCloseWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration from tailwind.config.ts
  };

  const animationClass = isClosing ? 'animate-slide-down' : 'animate-slide-up';

  return (
    <div 
      className={`fixed inset-x-0 bottom-0 bg-white z-40 ${animationClass}`}
      style={{ top: '109px' }}
    >
      <div className="h-[calc(100vh-125px)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center text-gray-500">
              Start typing to search products
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{filteredProducts.length} results found</p>
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <Link 
                    to={`/product/${product.id}`}
                    className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-md"
                    onClick={handleCloseWithAnimation}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={product.image || '/placeholder.svg'} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.title}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="font-medium">{product.currency} {product.price}</p>
                    </div>
                  </Link>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No products found for "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
