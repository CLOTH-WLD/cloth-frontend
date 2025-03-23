
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { formatCurrency, initiatePayment } from '@/services/paymentService';

const Cart: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const paymentIntent = await initiatePayment(items, subtotal);
      
      // In a real app, this would integrate with the Worldcoin MiniKit
      // For demo purposes, we'll just simulate a successful payment
      setTimeout(() => {
        navigate(`/success?orderId=${paymentIntent.id}`);
        clearCart(); // Clear cart on successful checkout
      }, 1500);
      
    } catch (error) {
      console.error('Checkout failed:', error);
      setLoading(false);
    }
  };
  
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
            Continue Shopping
          </button>
          
          <h1 className="text-xl font-semibold">Your Cart</h1>
        </div>
        
        {items.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-cloth-charcoal text-white py-2 px-6 rounded-md hover:bg-black transition-colors"
            >
              Shop Now
            </button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <CartItem key={item.product.id} item={item} index={index} />
                ))}
              </div>
            </AnimatePresence>
            
            <motion.div 
              className="mt-6 pt-6 border-t"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex justify-between mb-2">
                <p className="text-sm text-cloth-mediumgray">Subtotal</p>
                <p className="text-sm font-medium">{formatCurrency(subtotal)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-sm text-cloth-mediumgray">Shipping</p>
                <p className="text-sm font-medium">Calculated at checkout</p>
              </div>
              <div className="flex justify-between mb-6">
                <p className="font-medium">Total</p>
                <p className="font-semibold">{formatCurrency(subtotal)}</p>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-cloth-charcoal text-white py-3 px-6 rounded-md hover:bg-black transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay with World App'
                )}
              </button>
            </motion.div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
