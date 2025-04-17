
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Input } from './ui/input';
import BurgerMenu from './BurgerMenu';
import SearchOverlay from './navbar/SearchOverlay';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between w-full">
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
        </div>
        
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
      </header>
      
      {isSearchActive && (
        <SearchOverlay 
          isActive={isSearchActive} 
          onClose={() => setIsSearchActive(false)} 
        />
      )}
    </>
  );
};

export default Navbar;
