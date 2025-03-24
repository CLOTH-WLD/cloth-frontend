
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Truck, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/services/paymentService';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API call using the orderId
  const mockOrder = {
    id: orderId,
    date: '2024-02-20',
    status: 'Delivered',
    total: 89.99,
    items: [
      {
        id: '1',
        title: 'Classic White T-Shirt',
        price: 29.99,
        quantity: 2,
        size: 'L',
        color: 'White',
        image: '/placeholder.svg'
      },
      {
        id: '2',
        title: 'Denim Jacket',
        price: 30.01,
        quantity: 1,
        size: 'M',
        image: '/placeholder.svg'
      }
    ],
    shipping: {
      fullName: 'Alex Miller',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    },
    timeline: [
      { date: '2024-02-20', status: 'Delivered', icon: Package },
      { date: '2024-02-18', status: 'Shipped', icon: Truck },
      { date: '2024-02-17', status: 'Payment Confirmed', icon: CreditCard },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full py-6 px-4">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center text-sm text-cloth-mediumgray hover:text-cloth-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Profile
        </button>

        <h1 className="text-2xl font-semibold mb-6">Order #{orderId}</h1>

        <div className="grid gap-6">
          {/* Order Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {mockOrder.timeline.map((event, index) => (
                  <div key={index} className="flex items-start mb-4 last:mb-0">
                    <div className="flex items-center">
                      <div className="bg-cloth-charcoal rounded-full p-2">
                        <event.icon className="h-4 w-4 text-white" />
                      </div>
                      {index !== mockOrder.timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-200 absolute left-5 ml-0.5" 
                             style={{ top: `${(index * 40) + 32}px`, height: '40px' }} />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center py-2 border-b last:border-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="text-sm text-gray-500">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && item.size && <span> • </span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity} × {formatCurrency(item.price)}
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pt-4 font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(mockOrder.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Details */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{mockOrder.shipping.fullName}</p>
                <p>{mockOrder.shipping.address}</p>
                <p>{mockOrder.shipping.city}, {mockOrder.shipping.state} {mockOrder.shipping.zipCode}</p>
                <p>{mockOrder.shipping.country}</p>
                {mockOrder.shipping.phone && <p>Phone: {mockOrder.shipping.phone}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
