import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RefreshCw, Ruler, PackageCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const faqCategories = [
  {
    id: "shipping",
    name: "Shipping",
    icon: <Truck className="h-10 w-10 text-cloth-charcoal" />,
    color: "bg-blue-50",
    description: "Learn about shipping options, delivery times, and tracking.",
    questions: [
      {
        question: "When will my order ship?",
        answer: "Orders typically ship within 1-2 business days after being placed. You'll receive a shipping confirmation email with tracking information once your order has been shipped."
      },
      {
        question: "How much does shipping cost?",
        answer: "We offer free standard shipping on all orders over $50. For orders under $50, shipping costs are calculated at checkout based on location and selected shipping method."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import taxes may apply and are the responsibility of the recipient."
      }
    ]
  },
  {
    id: "returns",
    name: "Returns & Exchanges",
    icon: <RefreshCw className="h-10 w-10 text-cloth-charcoal" />,
    color: "bg-green-50",
    description: "Information about our return policy and exchange process.",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery for unworn items in original packaging. Return shipping is free for domestic orders."
      },
      {
        question: "How do I start a return or exchange?",
        answer: "To initiate a return or exchange, log into your account and go to your order history. Select the item(s) you wish to return and follow the instructions. You'll receive a prepaid shipping label for domestic returns."
      },
      {
        question: "How long do refunds take to process?",
        answer: "Once we receive your return, it takes 3-5 business days to inspect and process. Refunds are issued to the original payment method and may take an additional 2-5 business days to appear on your statement."
      }
    ]
  },
  {
    id: "sizing",
    name: "Sizing Guide",
    icon: <Ruler className="h-10 w-10 text-cloth-charcoal" />,
    color: "bg-purple-50",
    description: "Find your perfect fit with our detailed sizing information.",
    questions: [
      {
        question: "How do I find my correct size?",
        answer: "We recommend measuring yourself and referring to our detailed size charts available on each product page. If you're between sizes, we generally recommend sizing up for a more comfortable fit."
      },
      {
        question: "Do your items run true to size?",
        answer: "Our clothing generally runs true to size, but each product description will note if an item runs smaller or larger than standard sizing. We also include model measurements and the size they're wearing for reference."
      },
      {
        question: "What if my item doesn't fit?",
        answer: "If your item doesn't fit, you can exchange it for a different size within 30 days of delivery. Visit our Returns & Exchanges page for detailed instructions on how to process an exchange."
      }
    ]
  },
  {
    id: "orders",
    name: "Order Status",
    icon: <PackageCheck className="h-10 w-10 text-cloth-charcoal" />,
    color: "bg-amber-50",
    description: "Check on your orders and manage your purchases.",
    questions: [
      {
        question: "How do I check my order status?",
        answer: "You can check your order status by logging into your account and viewing your order history. You'll also receive email updates when your order is confirmed, shipped, and delivered."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or canceled within 2 hours of placement. After this window, orders are processed for shipping and cannot be changed. Please contact customer support immediately if you need to make changes."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All payments are securely processed and encrypted to ensure your information remains safe."
      }
    ]
  }
];

const Faq: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const activeCategoryId = category || "shipping";
  
  const activeCategory = faqCategories.find(cat => cat.id === activeCategoryId) || faqCategories[0];
  
  useEffect(() => {
    // If category doesn't exist, redirect to shipping
    if (category && !faqCategories.some(cat => cat.id === category)) {
      navigate('/faq/shipping');
    }
  }, [category, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Help Center</h1>
          
          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {faqCategories.map((cat) => (
              <Link to={`/faq/${cat.id}`} key={cat.id}>
                <Card className={`hover:shadow-md transition-all duration-300 h-full ${activeCategoryId === cat.id ? 'ring-2 ring-cloth-charcoal' : ''}`}>
                  <CardContent className={`p-6 flex flex-col items-center text-center ${cat.color} rounded-lg h-full`}>
                    <div className="mb-4 p-4 bg-white rounded-full">
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{cat.description}</p>
                    <Button variant="outline" size="sm" className="mt-auto">
                      View {cat.name} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Selected Category Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-full ${activeCategory.color} mr-4`}>
                {activeCategory.icon}
              </div>
              <h2 className="text-2xl font-bold">{activeCategory.name}</h2>
            </div>
            
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-6">
                {activeCategory.questions.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
                    <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Other Categories */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium mb-4 text-lg">Other FAQ Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {faqCategories
                .filter(cat => cat.id !== activeCategoryId)
                .map(cat => (
                  <Link to={`/faq/${cat.id}`} key={cat.id} className="block">
                    <div className={`${cat.color} p-4 rounded-lg flex items-center hover:shadow-sm transition-all`}>
                      <div className="mr-3">
                        {cat.icon}
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
