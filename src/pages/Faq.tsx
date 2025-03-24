
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Faq: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
          
          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
              <TabsTrigger value="sizing">Sizing Guide</TabsTrigger>
              <TabsTrigger value="orders">Order Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>When will my order ship?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Orders typically ship within 1-2 business days after being placed. You'll receive a shipping confirmation email with tracking information once your order has been shipped.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>How much does shipping cost?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We offer free standard shipping on all orders over $50. For orders under $50, shipping costs are calculated at checkout based on location and selected shipping method.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Do you ship internationally?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import taxes may apply and are the responsibility of the recipient.</p>
                </CardContent>
              </Card>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-3">Other FAQ Topics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/faq/returns" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Returns & Exchanges
                  </Link>
                  <Link to="/faq/sizing" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Sizing Guide
                  </Link>
                  <Link to="/faq/orders" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Order Status
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What is your return policy?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We accept returns within 30 days of delivery for unworn items in original packaging. Return shipping is free for domestic orders.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>How do I start a return or exchange?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>To initiate a return or exchange, log into your account and go to your order history. Select the item(s) you wish to return and follow the instructions. You'll receive a prepaid shipping label for domestic returns.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>How long do refunds take to process?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Once we receive your return, it takes 3-5 business days to inspect and process. Refunds are issued to the original payment method and may take an additional 2-5 business days to appear on your statement.</p>
                </CardContent>
              </Card>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-3">Other FAQ Topics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/faq/shipping" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Shipping Information
                  </Link>
                  <Link to="/faq/sizing" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Sizing Guide
                  </Link>
                  <Link to="/faq/orders" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Order Status
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sizing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How do I find my correct size?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We recommend measuring yourself and referring to our detailed size charts available on each product page. If you're between sizes, we generally recommend sizing up for a more comfortable fit.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Do your items run true to size?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our clothing generally runs true to size, but each product description will note if an item runs smaller or larger than standard sizing. We also include model measurements and the size they're wearing for reference.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What if my item doesn't fit?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>If your item doesn't fit, you can exchange it for a different size within 30 days of delivery. Visit our Returns & Exchanges page for detailed instructions on how to process an exchange.</p>
                </CardContent>
              </Card>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-3">Other FAQ Topics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/faq/shipping" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Shipping Information
                  </Link>
                  <Link to="/faq/returns" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Returns & Exchanges
                  </Link>
                  <Link to="/faq/orders" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Order Status
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How do I check my order status?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You can check your order status by logging into your account and viewing your order history. You'll also receive email updates when your order is confirmed, shipped, and delivered.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Can I modify or cancel my order?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Orders can be modified or canceled within 2 hours of placement. After this window, orders are processed for shipping and cannot be changed. Please contact customer support immediately if you need to make changes.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All payments are securely processed and encrypted to ensure your information remains safe.</p>
                </CardContent>
              </Card>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-3">Other FAQ Topics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/faq/shipping" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Shipping Information
                  </Link>
                  <Link to="/faq/returns" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Returns & Exchanges
                  </Link>
                  <Link to="/faq/sizing" className="text-cloth-charcoal hover:text-cloth-charcoal/80 flex items-center">
                    <ExternalLink size={16} className="mr-2" />
                    Sizing Guide
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
