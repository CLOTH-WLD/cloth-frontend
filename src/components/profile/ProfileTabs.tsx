
import React from 'react';
import { MapPin, Package, Ticket } from 'lucide-react';
import OrdersTab, { Order } from './OrdersTab';
import VouchersTab, { Voucher } from './VouchersTab';

interface ProfileTabsProps {
  orders: Order[];
  vouchers: Voucher[];
  isMobile: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  orders,
  vouchers,
  isMobile
}) => {
  return (
    <div className="space-y-6">
      <OrdersTab orders={orders} />
      <VouchersTab vouchers={vouchers} />
    </div>
  );
};

export default ProfileTabs;
