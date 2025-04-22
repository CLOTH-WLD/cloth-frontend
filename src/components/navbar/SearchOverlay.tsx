
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { searchProducts } from '@/lib/backendRequests';
import { ShopifyProduct } from '@/types/request';
import { useToast } from '@/hooks/use-toast';

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
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }
    
    setIsLoading(true);
    
    const timer = setTimeout(async () => {
      try {
        const searchResults = await searchProducts({ 
          query: searchTerm,
          first: 30
        });
        
        setProducts(searchResults.products || []);
      } catch (error) {
        console.error('Failed to search products:', error);
        toast({
          variant: "destructive",
          title: "Search Failed",
          description: "Unable to search products. Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, toast]);
  
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
          ) : products.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{products.length} results found</p>
              {products.map((product) => (
                <div key={product.id}>
                  <Link 
                    to={`/product/${product.handle}`}
                    className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-md"
                    onClick={handleCloseWithAnimation}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={product.images?.[0] || '/placeholder.svg'} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.title}</h3>
                      {product.collections && product.collections.length > 0 && (
                        <p className="text-sm text-gray-500">{product.collections[0].title}</p>
                      )}
                      {product.variants && product.variants.length > 0 && (
                        <p className="font-medium">
                          ${parseFloat(product.variants[0].price).toFixed(2)}
                          {product.variants[0].compareAtPrice && 
                            parseFloat(product.variants[0].compareAtPrice) > parseFloat(product.variants[0].price) && (
                              <span className="line-through text-gray-500 text-sm ml-2">
                                ${parseFloat(product.variants[0].compareAtPrice).toFixed(2)}
                              </span>
                            )
                          }
                        </p>
                      )}
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
