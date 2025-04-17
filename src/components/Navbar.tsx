
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search, ArrowLeft, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import BurgerMenu from './BurgerMenu';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import { Product } from '@/types/product';
import { getAllProducts } from '@/services/productService';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const location = useLocation();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    
    if (isSearchActive) {
      fetchProducts();
    }
  }, [isSearchActive]);
  
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
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchTerm('');
    setFilteredProducts([]);
  };
  
  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between w-full">
          {isSearchActive ? (
            <div className="flex-1 flex items-center space-x-4">
              <button onClick={handleCloseSearch} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products, brands, and categories..."
                  className="pl-10 h-10 w-full border-none bg-cloth-offwhite focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                  autoFocus
                />
                {searchTerm && (
                  <button 
                    onClick={handleClearSearch} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-semibold tracking-tighter">Cloth</span>
              </Link>
              
              <div className="flex items-center space-x-5">
                <Link to="/profile" className="p-1">
                  <User className="w-6 h-6" />
                </Link>
                
                <Link to="/favorites" className="p-1">
                  <Heart className="w-6 h-6" />
                </Link>
                
                <Link to="/cart" className="relative p-1">
                  <ShoppingBag className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cloth-charcoal text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </>
          )}
        </div>
        
        {!isSearchActive && (
          <div className="border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center w-full">
              <BurgerMenu />
              
              <div className="flex-1 relative">
                <button 
                  onClick={() => setIsSearchActive(true)}
                  className="block w-full"
                >
                  <Input 
                    placeholder="Search" 
                    readOnly
                    className="h-12 w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 cursor-pointer"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {isSearchActive && (
        <div className="fixed inset-0 bg-white z-40" style={{ top: '57px' }}>
          <div className="h-full overflow-y-auto">
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
                        onClick={handleCloseSearch}
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
      )}
    </>
  );
};

export default Navbar;
