
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTab, { Order } from './OrdersTab';
import VouchersTab, { Voucher } from './VouchersTab';
import ShippingTab, { ShippingDetails } from './ShippingTab';
import PreferencesTab from './PreferencesTab';

interface ProfileTabsProps {
  orders: Order[];
  vouchers: Voucher[];
  isMobile: boolean;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  shippingDetails: ShippingDetails;
  editingShipping: boolean;
  setEditingShipping: (value: boolean) => void;
  handleShippingUpdate: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userPreference: string;
  setUserPreference: (value: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  orders,
  vouchers,
  isMobile,
  activeTab,
  setActiveTab,
  shippingDetails,
  editingShipping,
  setEditingShipping,
  handleShippingUpdate,
  handleInputChange,
  userPreference,
  setUserPreference
}) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
      </TabsList>
      
      <TabsContent value="shipping" className="mt-4">
        <ShippingTab 
          shippingDetails={shippingDetails}
          editingShipping={editingShipping}
          setEditingShipping={setEditingShipping}
          handleShippingUpdate={handleShippingUpdate}
          handleInputChange={handleInputChange}
        />
      </TabsContent>
      
      <TabsContent value="preferences" className="mt-4">
        <PreferencesTab 
          userPreference={userPreference}
          setUserPreference={setUserPreference}
        />
      </TabsContent>
      
      <TabsContent value="orders" className="mt-4">
        <OrdersTab orders={orders} />
      </TabsContent>
      
      <TabsContent value="vouchers" className="mt-4">
        <VouchersTab vouchers={vouchers} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
