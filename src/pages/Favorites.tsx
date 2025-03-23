
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-2xl mx-auto w-full py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-cloth-mediumgray hover:text-cloth-charcoal transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          <h1 className="text-xl font-semibold">Your Favorites</h1>
        </div>
        
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Heart className="w-12 h-12 mx-auto mb-4 text-cloth-mediumgray" />
          <p className="text-lg mb-4">Your favorites list is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-cloth-charcoal text-white py-2 px-6 rounded-md hover:bg-black transition-colors"
          >
            Explore Products
          </button>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
