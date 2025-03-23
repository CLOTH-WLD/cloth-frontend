
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '@/services/productService';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatCurrency } from '@/services/paymentService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cloth-lightgray aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-cloth-lightgray rounded w-3/4"></div>
              <div className="h-6 bg-cloth-lightgray rounded w-1/4"></div>
              <div className="h-24 bg-cloth-lightgray rounded w-full"></div>
              <div className="h-12 bg-cloth-lightgray rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm mb-6 text-cloth-mediumgray hover:text-cloth-charcoal transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </motion.div>
          
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
            <p className="text-xl font-medium mb-4">
              {formatCurrency(product.price)}
            </p>
            
            <p className="text-cloth-mediumgray mb-6">
              {product.description}
            </p>
            
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4 text-sm font-medium">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cloth-beige"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-cloth-charcoal text-white py-3 px-6 rounded-md hover:bg-black transition-colors"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
