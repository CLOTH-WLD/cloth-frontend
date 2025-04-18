
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Input } from './ui/input';
import BurgerMenu from './BurgerMenu';
import SearchOverlay from './navbar/SearchOverlay';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleCloseSearch = () => {
    // Just trigger the close animation - the SearchOverlay component 
    // will handle the animation timing before actually removing itself
    setIsSearchActive(false);
  };
  
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
            {!isSearchActive ? (
              <BurgerMenu />
            ) : (
              <button 
                onClick={handleCloseSearch} 
                className="p-3"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            
            <div className="flex-1 relative">
              <Input 
                placeholder="Search products" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                className="h-12 w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <SearchOverlay 
        isActive={isSearchActive} 
        onClose={handleCloseSearch}
        searchTerm={searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
      />
    </>
  );
};

export default Navbar;
