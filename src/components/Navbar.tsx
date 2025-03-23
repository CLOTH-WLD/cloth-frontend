
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Heart, Menu, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full glass-blur px-4 py-3 flex flex-col border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top row with logo and icons */}
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold tracking-tighter">Cloth</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="p-2">
            <User className="w-5 h-5" />
          </Link>
          
          <Link to="/favorites" className="p-2">
            <Heart className="w-5 h-5" />
          </Link>
          
          <Link to="/cart" className="relative p-2">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cloth-charcoal text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Bottom row with burger menu and search */}
      <div className="flex items-center justify-between w-full mt-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className={`flex-1 mx-2 transition-all duration-200 ${showSearch ? 'opacity-100' : 'opacity-100'}`}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cloth-mediumgray" />
            <Input 
              placeholder="Search products..." 
              className="pl-8 h-9 w-full"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
