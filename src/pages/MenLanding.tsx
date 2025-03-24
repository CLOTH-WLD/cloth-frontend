
import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { getAllProducts } from '@/services/productService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import NotificationBanner from '@/components/NotificationBanner';
import { useEffect, useState } from 'react';
import CategoryList from '@/components/CategoryList';

const MenLanding: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  useEffect(() => {
    // Save the preference locally
    localStorage.setItem('userPreference', 'men');
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Filter products for men
    const menProducts = products.filter(product => 
      product.category.toLowerCase().includes('men')
    );
    
    if (categoryFilter && categoryFilter !== 'all') {
      setFilteredProducts(menProducts.filter(product => 
        product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      ));
    } else {
      setFilteredProducts(menProducts);
    }
  }, [products, categoryFilter]);
  
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
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredProducts.slice(0, 8).map((product, index) => (
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
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products
                .filter(product => product.category.toLowerCase().includes('men'))
                .slice(8, 16)
                .map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
        
        {/* Men's Favorite Categories */}
        <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Men's Favorite Categories</h2>
          <CategoryList categories={menCategories} />
        </div>
        
        {/* Notification Banner */}
        <NotificationBanner />
      </main>
      
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default MenLanding;
