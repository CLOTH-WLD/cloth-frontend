import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Loader2, Pencil } from 'lucide-react';
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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { countryOptions } from '@/components/profile/ShippingTab';
import { Button } from '@/components/ui/button';

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
  const [editingShipping, setEditingShipping] = useState(true);
  const [shippingValid, setShippingValid] = useState(false);
  const { toast } = useToast();
  
  // Load shipping details from profile (localStorage in this example)
  useEffect(() => {
    const savedShipping = localStorage.getItem('shipping-details');
    if (savedShipping) {
      try {
        const parsed = JSON.parse(savedShipping);
        setShippingDetails(parsed);
        // If we have valid shipping details, hide the form initially
        const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country'] as const;
        const allFieldsFilled = requiredFields.every(field => parsed[field]?.trim() !== '');
        setEditingShipping(!allFieldsFilled);
      } catch (error) {
        console.error('Failed to parse shipping details:', error);
      }
    }
  }, []);
  
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

  const handleCountryChange = (selectedOption: any) => {
    const event = {
      target: {
        name: 'country',
        value: selectedOption.label
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  const handlePhoneChange = (value: string) => {
    const event = {
      target: {
        name: 'phone',
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
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
      
      // Save shipping details to localStorage
      localStorage.setItem('shipping-details', JSON.stringify(shippingDetails));
      
      // Simulate successful payment
      setTimeout(() => {
        navigate(`/success?orderId=${paymentIntent.id}`);
        clearCart();
      }, 1500);
      
    } catch (error) {
      console.error('Checkout failed:', error);
      setLoading(false);
    }
  };

  const selectedCountry = countryOptions.find(option => option.label === shippingDetails.country) || null;
  
  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: '40px',
      minHeight: '40px',
      borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--input))',
      boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring))' : 'none',
      backgroundColor: 'hsl(var(--background))',
      borderRadius: 'var(--radius)',
      '&:hover': {
        borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--input))'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      borderRadius: 'var(--radius)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 9999
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'hsl(var(--accent))' : state.isFocused ? 'hsl(var(--accent))' : 'transparent',
      color: state.isSelected ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))'
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--foreground))'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
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
              {editingShipping ? (
                <Accordion type="single" collapsible defaultValue="shipping" className="w-full border rounded-md">
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
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <PhoneInput
                            country={'us'}
                            value={shippingDetails.phone}
                            onChange={handlePhoneChange}
                            inputClass="!w-full !h-10 !py-2 !text-base md:!text-sm !rounded-md !border !border-input !bg-background"
                            buttonClass="!border !border-input !rounded-md !bg-background"
                            containerClass="!w-full"
                            dropdownClass="!bg-background !min-w-fit"
                            buttonStyle={{ 
                              width: '58px', 
                              background: 'hsl(var(--background))', 
                              borderTopRightRadius: 0, 
                              borderBottomRightRadius: 0 
                            }}
                            inputStyle={{ 
                              paddingLeft: '65px',
                              width: '100%', 
                              background: 'hsl(var(--background))', 
                              borderTopLeftRadius: 0, 
                              borderBottomLeftRadius: 0 
                            }}
                            dropdownStyle={{ 
                              background: 'hsl(var(--background))', 
                              color: 'hsl(var(--foreground))', 
                              borderRadius: 'var(--radius)',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                              zIndex: 9999
                            }}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={shippingDetails.address} 
                            onChange={handleInputChange} 
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
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            id="country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            placeholder="Select country"
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={customSelectStyles}
                          />
                        </div>
                      </div>

                      {shippingValid && (
                        <div className="flex justify-end mt-4">
                          <Button
                            type="button"
                            onClick={() => setEditingShipping(false)}
                          >
                            Save Details
                          </Button>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <div className="w-full border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Shipping To:</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingShipping(true)}
                      className="h-8 px-2"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-cloth-mediumgray">
                    <p>{shippingDetails.fullName}</p>
                    <p>{shippingDetails.address}</p>
                    <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
                    <p>{shippingDetails.country}</p>
                    {shippingDetails.phone && <p>Phone: {shippingDetails.phone}</p>}
                  </div>
                </div>
              )}
              
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
                  disabled={loading || !shippingValid}
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
