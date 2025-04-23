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
import { getCollectionsByName } from '@/lib/backendRequests';
import { useToast } from '@/hooks/use-toast';

const WomenLanding: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [arrivalsLoading, setArrivalsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [womenCollections, setWomenCollections] = useState<any[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem('userPreference', 'women');
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const collectionData = await getCollectionProducts('women', { first: 16 });
        
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
            category: 'Women',
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
    
    const fetchNewArrivals = async () => {
      try {
        setArrivalsLoading(true);
        const arrivalsData = await getCollectionProducts('women-arrivals', { first: 16 });
        
        const transformedArrivals = arrivalsData.products.map(shopifyProduct => {
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
            category: 'Women',
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
        
        setNewArrivals(transformedArrivals);
      } catch (error) {
        console.error('Failed to fetch new arrivals:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load new arrivals. Please try again later."
        });
      } finally {
        setArrivalsLoading(false);
      }
    };
    
    fetchProducts();
    fetchNewArrivals();
  }, [toast]);
  
  useEffect(() => {
    async function fetchCollections() {
      setCollectionsLoading(true);
      try {
        const res = await getCollectionsByName('women');
        setWomenCollections(res.slice(0, 12));
      } catch (err) {
        setWomenCollections([]);
      }
      setCollectionsLoading(false);
    }
    fetchCollections();
  }, []);

  const womenCategories = [
    "Women's shoes",
    "Women's t-shirts and tops",
    "Women's backpacks",
    "Women's jeans",
    "Women's cardigans",
    "Women's boots",
    "Women's clothing",
    "Women's swimwear",
    "Women's sunglasses",
    "Women's sneakers",
    "Women's evening dresses",
    "Women's casual dresses",
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-[#FFDEE2] py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Women's Collection</h1>
            <p className="text-lg">Discover the latest trends in women's fashion</p>
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
        
        {/* New Arrivals Section */}
        <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-cloth-lightbeige">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">New Arrivals</h2>
          {arrivalsLoading ? (
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
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {newArrivals.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-cloth-mediumgray">No new arrivals found</p>
            </div>
          )}
        </div>
        
        {/* Women's Favorite Categories */}
        <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Women's Favorite Categories</h2>
          {collectionsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) =>
                <div className="bg-cloth-lightgray rounded p-4 animate-pulse h-10" key={i} />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {womenCollections.map((col: any) => (
                <button
                  key={col.id}
                  className="text-left p-2 hover:bg-cloth-lightbeige transition-colors rounded-md font-helvetica text-sm"
                  onClick={() => {
                    if (col.handle) {
                      window.location.href = `/collection/${col.handle}`;
                    }
                  }}
                >
                  {col.title}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <NotificationBanner />
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default WomenLanding;
