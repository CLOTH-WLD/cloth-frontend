
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Home } from 'lucide-react';
import { confirmPayment, formatCurrency } from '@/services/paymentService';
import { OrderConfirmation } from '@/types/product';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderConfirmation | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }
    
    const getOrderConfirmation = async () => {
      try {
        setLoading(true);
        const confirmation = await confirmPayment(orderId);
        setOrderDetails(confirmation);
      } catch (error) {
        console.error('Failed to get order confirmation:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getOrderConfirmation();
  }, [orderId, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex justify-center">
          <motion.div 
            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Check className="w-8 h-8" />
          </motion.div>
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Order Confirmed!</h1>
        
        {loading ? (
          <p className="text-cloth-mediumgray animate-pulse">Loading order details...</p>
        ) : orderDetails ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-cloth-mediumgray mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            
            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-cloth-mediumgray">Order number:</span>
                <span className="font-medium">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-cloth-mediumgray">Date:</span>
                <span>{new Date(orderDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cloth-mediumgray">Total:</span>
                <span className="font-semibold">{formatCurrency(orderDetails.total)}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <p className="text-cloth-mediumgray">
            Something went wrong. Please contact support.
          </p>
        )}
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-cloth-charcoal text-white py-3 px-6 rounded-md hover:bg-black transition-colors mt-4 flex items-center justify-center"
        >
          <Home className="w-4 h-4 mr-2" />
          Continue Shopping
        </button>
      </motion.div>
    </div>
  );
};

export default Success;
