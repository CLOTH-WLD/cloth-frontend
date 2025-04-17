
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import BurgerMenu from './BurgerMenu';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const previousPath = location.state?.from || '/';
  
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      {/* Top row with logo and icons */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between w-full">
        {isSearchPage ? (
          <div className="flex-1 flex items-center space-x-4">
            <Link to={previousPath} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search products, brands, and categories..."
                className="pl-10 h-10 w-full border-none bg-cloth-offwhite focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
              />
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
      
      {/* Bottom row with burger menu and search */}
      {!isSearchPage && (
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center w-full">
            <BurgerMenu />
            
            <div className="flex-1 relative">
              <Link 
                to="/search" 
                state={{ from: location.pathname }}
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
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
