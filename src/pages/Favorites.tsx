
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product } from '@/types/product';
import { getFavoriteProducts, toggleFavorite } from '@/services/productService';
import ProductCard from '@/components/ProductCard';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const products = await getFavoriteProducts();
        setFavoriteProducts(products);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);
  
  const handleToggleFavorite = async (productId: string) => {
    await toggleFavorite(productId);
    setFavoriteProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full py-6 px-4 sm:px-6">
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
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : favoriteProducts.length === 0 ? (
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
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard 
                    product={product} 
                    onToggleFavorite={() => handleToggleFavorite(product.id)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
