
import React from 'react';
import { Package, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View and manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4 hover:shadow-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <Package className="h-5 w-5 text-gray-400" />
                    <h3 className="font-medium">Order {order.id}</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <p className="text-sm text-gray-500">{order.date}</p>
                    <span 
                      className={`mt-1 sm:mt-0 inline-flex w-fit px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    Details <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
