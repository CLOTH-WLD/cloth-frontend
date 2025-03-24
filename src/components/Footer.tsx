
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="bg-cloth-lightbeige py-8 px-4 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Cloth</h3>
          <p className="text-cloth-mediumgray text-sm mb-4">
            Minimalist clothing for the modern lifestyle.
          </p>
          <div className="flex items-center text-sm text-cloth-mediumgray">
            <span>Powered with WorldCoin</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-cloth-mediumgray hover:text-cloth-charcoal transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-cloth-mediumgray hover:text-cloth-charcoal transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-cloth-mediumgray hover:text-cloth-charcoal transition-colors">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-cloth-mediumgray hover:text-cloth-charcoal transition-colors">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-cloth-mediumgray hover:text-cloth-charcoal transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-cloth-lightgray text-center text-xs text-cloth-mediumgray">
        <p>&copy; {new Date().getFullYear()} Cloth. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
