
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Wallet, Package, History, CreditCard, MapPin, ExternalLink, Edit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for demonstration purposes
const mockProfile = {
  username: 'alex_miller',
  walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  email: 'alex@example.com',
};

const mockShipping = {
  fullName: 'Alex Miller',
  address: '123 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94105',
  country: 'United States',
  phone: '+1 (555) 123-4567',
};

const mockOrders = [
  { id: 'ORD-1234', date: '2023-10-15', status: 'Delivered', total: 89.99 },
  { id: 'ORD-5678', date: '2023-09-22', status: 'Shipped', total: 125.50 },
  { id: 'ORD-9012', date: '2023-08-05', status: 'Processing', total: 64.75 },
];

const mockTransactions = [
  { id: 'TRX-1234', date: '2023-10-15', type: 'Purchase', amount: -89.99, status: 'Completed' },
  { id: 'TRX-5678', date: '2023-09-22', type: 'Purchase', amount: -125.50, status: 'Completed' },
  { id: 'TRX-9012', date: '2023-09-15', type: 'Refund', amount: 35.25, status: 'Completed' },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [editingShipping, setEditingShipping] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(mockShipping);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full py-6 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-cloth-mediumgray hover:text-cloth-charcoal transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          <h1 className="text-xl font-semibold">Your Profile</h1>
        </div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* User summary card */}
            <Card className="w-full md:w-1/3">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={mockProfile.username} />
                  <AvatarFallback className="bg-cloth-charcoal text-white text-xl">
                    {mockProfile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{mockProfile.username}</CardTitle>
                  <CardDescription className="mt-1">Member since 2023</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Wallet Address</p>
                      <p className="text-sm text-gray-500 truncate">{mockProfile.walletAddress}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(mockProfile.walletAddress)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">{mockProfile.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main content area with tabs */}
            <div className="flex-1">
              <Tabs defaultValue="shipping" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
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
                
                {/* Shipping Tab */}
                <TabsContent value="shipping">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Shipping Details</CardTitle>
                        <CardDescription>Your shipping information for orders</CardDescription>
                      </div>
                      {!editingShipping && (
                        <Button variant="ghost" size="sm" onClick={() => setEditingShipping(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editingShipping ? (
                        <form onSubmit={handleShippingUpdate} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <Input 
                                id="phone" 
                                name="phone" 
                                value={shippingDetails.phone} 
                                onChange={handleInputChange} 
                                required 
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
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
                              <Input 
                                id="country" 
                                name="country" 
                                value={shippingDetails.country} 
                                onChange={handleInputChange} 
                                required 
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button type="button" variant="outline" onClick={() => setEditingShipping(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                            <p>{shippingDetails.fullName}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                            <p>{shippingDetails.phone}</p>
                          </div>
                          <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-gray-500">Address</h3>
                            <p>{shippingDetails.address}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">City</h3>
                            <p>{shippingDetails.city}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">State/Province</h3>
                            <p>{shippingDetails.state}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">ZIP/Postal Code</h3>
                            <p>{shippingDetails.zipCode}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Country</h3>
                            <p>{shippingDetails.country}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Orders</CardTitle>
                      <CardDescription>View and manage your orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {mockOrders.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'Delivered' 
                                      ? 'bg-green-100 text-green-800' 
                                      : order.status === 'Shipped' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {order.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm">
                                    Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-6">
                          <Package className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                          <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                          <div className="mt-6">
                            <Button onClick={() => navigate('/')}>
                              Browse Products
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Transactions Tab */}
                <TabsContent value="transactions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Transactions</CardTitle>
                      <CardDescription>View your payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {mockTransactions.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Transaction ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockTransactions.map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.id}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell className={`text-right ${
                                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    transaction.status === 'Completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : transaction.status === 'Pending' 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {transaction.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-6">
                          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions yet</h3>
                          <p className="mt-1 text-sm text-gray-500">You don't have any transaction history yet.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
