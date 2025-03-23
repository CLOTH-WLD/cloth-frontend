
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full glass-blur px-4 py-3 flex items-center justify-between border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-semibold tracking-tighter">Cloth</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/cart" className="relative p-2">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-cloth-charcoal text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </motion.header>
  );
};

export default Navbar;
