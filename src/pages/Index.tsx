
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCarousel from '@/components/CategoryCarousel';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import CategoryGrid from '@/components/CategoryGrid';
import NotificationBanner from '@/components/NotificationBanner';
import { getCollectionProducts } from '@/lib/backendRequests';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for user preference and redirect if needed
    const preference = localStorage.getItem('userPreference');
    if (preference && preference !== 'general') {
      switch(preference) {
        case 'women':
          navigate('/women');
          return;
        case 'men':
          navigate('/men');
          return;
        case 'kids':
          navigate('/kids');
          return;
        default:
          break;
      }
    }
    
    // Fetch products from men's collection
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCollectionProducts('men', { first: 16 });
        
        // Transform products to match our frontend structure
        const transformedProducts = response.map(shopifyProduct => ({
          id: shopifyProduct.id,
          title: shopifyProduct.title,
          description: shopifyProduct.description,
          image: shopifyProduct.images[0] || '',
          images: shopifyProduct.images,
          price: parseFloat(shopifyProduct.variants[0]?.price || '0'),
          currency: 'USD',
          category: 'Men',
          inStock: shopifyProduct.variants.some(v => v.available),
          variants: shopifyProduct.variants.map(v => ({
            id: v.id,
            title: `${v.size} / ${v.color}`,
            price: parseFloat(v.price),
            available: v.available,
            option1: v.size,
            option2: v.color
          })),
          discountPercentage: calculateDiscount(
            parseFloat(shopifyProduct.variants[0]?.price || '0'),
            parseFloat(shopifyProduct.variants[0]?.compareAtPrice || '0')
          )
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [navigate, toast]);
  
  const calculateDiscount = (price: number, compareAtPrice: number): number | undefined => {
    if (!compareAtPrice || compareAtPrice <= price) return undefined;
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Carousel */}
        <div className="category-carousel">
          <CategoryCarousel />
        </div>
        
        {/* Products Section */}
        <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-semibold tracking-tight">Recommended For You</h1>
            <p className="text-cloth-mediumgray mt-2">
              Discover our newest arrivals for the season
            </p>
          </motion.div>
          
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-card animate-pulse">
                  <div className="bg-cloth-lightgray aspect-[3/4] w-full rounded-md"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-cloth-lightgray rounded w-3/4"></div>
                    <div className="h-4 bg-cloth-lightgray rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-cloth-mediumgray">No products found</p>
            </div>
          )}
        </div>
        
        {/* Favorite Categories Grid */}
        <CategoryGrid />
        
        {/* Notification Banner */}
        <NotificationBanner />
      </main>
      
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
