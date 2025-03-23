
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Heart, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      {/* Top row with logo and icons */}
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
      
      {/* Bottom row with burger menu and search */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center w-full">
          <button className="px-5 py-3 border-r border-gray-200 flex flex-col space-y-1.5">
            <div className="w-5 h-0.5 bg-black"></div>
            <div className="w-5 h-0.5 bg-black"></div>
            <div className="w-5 h-0.5 bg-black"></div>
          </button>
          
          <div className="flex-1 relative">
            <Input 
              placeholder="Search" 
              className="h-12 w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          <button className="px-5 py-3">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
