
import React from 'react';
import { MapPin, Package, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShippingTab, { ShippingDetails } from './ShippingTab';
import OrdersTab, { Order } from './OrdersTab';
import TransactionsTab, { Transaction } from './TransactionsTab';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  shippingDetails: ShippingDetails;
  orders: Order[];
  transactions: Transaction[];
  editingShipping: boolean;
  setEditingShipping: (value: boolean) => void;
  handleShippingUpdate: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
  shippingDetails,
  orders,
  transactions,
  editingShipping,
  setEditingShipping,
  handleShippingUpdate,
  handleInputChange,
  isMobile
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'} mb-4`}>
        <TabsTrigger value="shipping" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Shipping</span>
        </TabsTrigger>
        <TabsTrigger value="orders" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span>Orders</span>
        </TabsTrigger>
        <TabsTrigger value="transactions" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Transactions</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="shipping">
        <ShippingTab 
          shippingDetails={shippingDetails}
          editingShipping={editingShipping}
          setEditingShipping={setEditingShipping}
          handleShippingUpdate={handleShippingUpdate}
          handleInputChange={handleInputChange}
        />
      </TabsContent>
      
      <TabsContent value="orders">
        <OrdersTab orders={orders} />
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionsTab transactions={transactions} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
