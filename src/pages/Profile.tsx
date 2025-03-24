import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ShippingTab, { ShippingDetails } from '@/components/profile/ShippingTab';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { Order } from '@/components/profile/OrdersTab';
import { Voucher } from '@/components/profile/VouchersTab';

// Mock data for demonstration purposes
const mockProfile = {
  username: 'alex_miller',
  walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  email: '',
};

const mockShipping: ShippingDetails = {
  fullName: 'Alex Miller',
  address: '123 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94105',
  country: 'United States',
  phone: '+1 (555) 123-4567',
};

const mockOrders: Order[] = [
  { id: 'ORD-1234', date: '2023-10-15', status: 'Delivered', total: 89.99 },
  { id: 'ORD-5678', date: '2023-09-22', status: 'Shipped', total: 125.50 },
  { id: 'ORD-9012', date: '2023-08-05', status: 'Processing', total: 64.75 },
];

const mockVouchers: Voucher[] = [
  { id: 'VCHR-001', code: 'WELCOME20', discount: '20%', expiry: '2023-12-31', isActive: true },
  { id: 'VCHR-002', code: 'SUMMER10', discount: '10%', expiry: '2023-10-30', isActive: false },
  { id: 'VCHR-003', code: 'FREESHIP', discount: 'Free Shipping', expiry: '2023-11-15', isActive: true },
];

const Profile: React.FC = () => {
  const [editingShipping, setEditingShipping] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(mockShipping);
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState(mockProfile.email);
  const isMobile = useIsMobile();
  
  const handleShippingUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setEditingShipping(false);
    // In a real app, you would send this data to your API
    console.log('Shipping details updated:', shippingDetails);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setEditingEmail(false);
    // In a real app, you would send this data to your API
    console.log('Email updated:', email);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full py-4 px-4 sm:px-6 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Your Profile</h1>
        
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* User summary card */}
            <ProfileHeader 
              username={mockProfile.username}
              walletAddress={mockProfile.walletAddress}
              email={email}
              editingEmail={editingEmail}
              setEditingEmail={setEditingEmail}
              setEmail={setEmail}
              handleEmailUpdate={handleEmailUpdate}
            />
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Shipping Details - Always Visible */}
              <ShippingTab 
                shippingDetails={shippingDetails}
                editingShipping={editingShipping}
                setEditingShipping={setEditingShipping}
                handleShippingUpdate={handleShippingUpdate}
                handleInputChange={handleInputChange}
              />
              
              {/* Orders and Vouchers */}
              <ProfileTabs 
                orders={mockOrders}
                vouchers={mockVouchers}
                isMobile={isMobile}
              />
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
