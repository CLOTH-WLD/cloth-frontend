import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import NotificationBanner from '@/components/NotificationBanner';
import { useEffect, useState } from 'react';
import CategoryList from '@/components/CategoryList';
import { getCollectionProducts } from '@/lib/backendRequests';
import { useToast } from '@/hooks/use-toast';

const MenLanding: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [essentials, setEssentials] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [essentialsLoading, setEssentialsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem('userPreference', 'men');
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const collectionData = await getCollectionProducts('men', { first: 16 });
        
        const transformedProducts = collectionData.products.map(shopifyProduct => {
          const firstVariant = shopifyProduct.variants[0];
          const price = parseFloat(firstVariant?.price || '0');
          const compareAtPrice = parseFloat(firstVariant?.compareAtPrice || '0');
          
          const discountPercentage = compareAtPrice > price
            ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
            : undefined;
          
          return {
            id: shopifyProduct.id,
            title: shopifyProduct.title,
            description: shopifyProduct.description,
            image: shopifyProduct.images[0] || '',
            images: shopifyProduct.images,
            price: price,
            compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
            currency: 'USD',
            category: 'Men',
            inStock: shopifyProduct.variants.some(v => v.available),
            discountPercentage,
            variants: shopifyProduct.variants.map(v => ({
              id: v.id,
              title: `${v.size} / ${v.color}`,
              price: parseFloat(v.price),
              available: v.available,
              option1: v.size,
              option2: v.color
            }))
          };
        });
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };
    
    const fetchEssentials = async () => {
      try {
        setEssentialsLoading(true);
        const essentialsData = await getCollectionProducts('essentials', { first: 16 });
        
        const transformedEssentials = essentialsData.products.map(shopifyProduct => {
          const firstVariant = shopifyProduct.variants[0];
          const price = parseFloat(firstVariant?.price || '0');
          const compareAtPrice = parseFloat(firstVariant?.compareAtPrice || '0');
          
          const discountPercentage = compareAtPrice > price
            ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
            : undefined;
          
          return {
            id: shopifyProduct.id,
            title: shopifyProduct.title,
            description: shopifyProduct.description,
            image: shopifyProduct.images[0] || '',
            images: shopifyProduct.images,
            price: price,
            compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
            currency: 'USD',
            category: 'Men',
            inStock: shopifyProduct.variants.some(v => v.available),
            discountPercentage,
            variants: shopifyProduct.variants.map(v => ({
              id: v.id,
              title: `${v.size} / ${v.color}`,
              price: parseFloat(v.price),
              available: v.available,
              option1: v.size,
              option2: v.color
            }))
          };
        });
        
        setEssentials(transformedEssentials);
      } catch (error) {
        console.error('Failed to fetch essentials:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load seasonal essentials. Please try again later."
        });
      } finally {
        setEssentialsLoading(false);
      }
    };
    
    fetchProducts();
    fetchEssentials();
  }, [toast]);
  
  const menCategories = [
    "Men's shoes",
    "Men's t-shirts",
    "Men's backpacks",
    "Men's cargo pants",
    "Men's jeans",
    "Men's trousers",
    "Men's leather jackets",
    "Men's kidney bags",
    "Men's clothing",
    "Men's belts",
    "Men's jewelry"
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#D3E4FD] py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Men's Collection</h1>
            <p className="text-lg">Discover the latest trends in men's fashion</p>
          </div>
        </div>
        
        {/* Recommended Products Section */}
        <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight">Recommended For You</h2>
            <p className="text-cloth-mediumgray mt-2">
              Curated styles just for you
            </p>
          </motion.div>
          
          {loading ? (
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
              {products.slice(0, 8).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-cloth-mediumgray">No products found in this category</p>
            </div>
          )}
        </div>
        
        {/* Seasonal Essentials Section */}
        <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-cloth-lightbeige">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Seasonal Essentials</h2>
          {essentialsLoading ? (
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
          ) : essentials.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {essentials.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-cloth-mediumgray">No seasonal essentials found</p>
            </div>
          )}
        </div>
        
        {/* Men's Favorite Categories */}
        <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Men's Favorite Categories</h2>
          <CategoryList categories={menCategories} />
        </div>
        
        <NotificationBanner />
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MenLanding;
