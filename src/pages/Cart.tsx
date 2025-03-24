
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, initiatePayment } from '@/services/paymentService';
import { ShippingDetails } from '@/components/profile/ShippingTab';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [shippingValid, setShippingValid] = useState(false);
  const { toast } = useToast();
  
  // Validate shipping information when it changes
  useEffect(() => {
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country'] as const;
    const allFieldsFilled = requiredFields.every(field => shippingDetails[field].trim() !== '');
    setShippingValid(allFieldsFilled);
  }, [shippingDetails]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckout = async () => {
    if (!shippingValid) {
      toast({
        title: "Missing Information",
        description: "Please complete your shipping details before checkout.",
        variant: "destructive"
      });
      return;
    }
    
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
              className="mt-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="w-full border rounded-md">
                <AccordionItem value="shipping">
                  <AccordionTrigger className="px-4 py-3">
                    <span className="font-medium">Shipping Information</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          name="fullName" 
                          value={shippingDetails.fullName} 
                          onChange={handleInputChange} 
                          placeholder="Enter your full name"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={shippingDetails.phone} 
                          onChange={handleInputChange} 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={shippingDetails.address} 
                          onChange={handleInputChange} 
                          placeholder="Enter your street address"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={shippingDetails.city} 
                          onChange={handleInputChange} 
                          placeholder="Enter your city"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={shippingDetails.state} 
                          onChange={handleInputChange} 
                          placeholder="Enter your state"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={shippingDetails.zipCode} 
                          onChange={handleInputChange} 
                          placeholder="Enter your ZIP code"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input 
                          id="country" 
                          name="country" 
                          value={shippingDetails.country} 
                          onChange={handleInputChange} 
                          placeholder="Enter your country"
                          required 
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-4 border-t">
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
              </div>
            </motion.div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
