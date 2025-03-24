
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { getProductsByCategory } from '@/services/productService';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import NotificationBanner from '@/components/NotificationBanner';
import { X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  
  // Get all available filters from products
  const allColors = React.useMemo(() => {
    const colorsSet = new Set<string>();
    products.forEach(product => {
      if (product.colors) {
        product.colors.forEach(color => colorsSet.add(color.name));
      }
    });
    return Array.from(colorsSet);
  }, [products]);
  
  const allSizes = React.useMemo(() => {
    const sizesSet = new Set<string>();
    products.forEach(product => {
      if (product.sizes) {
        product.sizes.forEach(size => sizesSet.add(size));
      }
    });
    return Array.from(sizesSet);
  }, [products]);
  
  // Get minimum and maximum price
  const priceRange2 = React.useMemo(() => {
    if (!products.length) return [0, 100] as [number, number];
    const prices = products.map(p => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))] as [number, number];
  }, [products]);
  
  useEffect(() => {
    if (priceRange2[0] !== priceRange[0] || priceRange2[1] !== priceRange[1]) {
      setPriceRange(priceRange2);
    }
  }, [priceRange2]);
  
  // Fetch products for this category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        const decodedCategory = decodeURIComponent(category);
        const data = await getProductsByCategory(decodedCategory);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
    
    // Reset filters when category changes
    setPriceRange([0, 100]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('default');
  }, [category]);
  
  // Apply filters and sorting
  useEffect(() => {
    if (!products.length) return;
    
    let filtered = [...products];
    
    // Filter by price
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by colors if any selected
    if (selectedColors.length) {
      filtered = filtered.filter(product => 
        product.colors?.some(color => selectedColors.includes(color.name))
      );
    }
    
    // Filter by sizes if any selected
    if (selectedSizes.length) {
      filtered = filtered.filter(product => 
        product.sizes?.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Keep default order
        break;
    }
    
    setFilteredProducts(filtered);
    
  }, [products, priceRange, selectedColors, selectedSizes, sortBy]);
  
  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  const clearAllFilters = () => {
    setPriceRange(priceRange2);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('default');
  };
  
  const formattedCategory = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-cloth-lightbeige py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">{formattedCategory}</h1>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Filters</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Clear all
                </button>
              </div>
              
              {/* Price Range Filter */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    value={[priceRange[0], priceRange[1]]}
                    max={priceRange2[1]}
                    min={priceRange2[0]}
                    step={1}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Colors Filter */}
              {allColors.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-4">Colors</h3>
                  <div className="space-y-2">
                    {allColors.map((color) => (
                      <div key={color} className="flex items-center">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => handleColorToggle(color)}
                        />
                        <label 
                          htmlFor={`color-${color}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sizes Filter */}
              {allSizes.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-4">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1 text-sm border rounded-md ${
                          selectedSizes.includes(size) 
                            ? 'bg-cloth-charcoal text-white' 
                            : 'text-gray-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Products grid */}
            <div className="md:col-span-3">
              {/* Sort and active filters */}
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Active filters */}
                  {selectedColors.map(color => (
                    <div key={`active-${color}`} className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm">
                      {color}
                      <button 
                        onClick={() => handleColorToggle(color)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedSizes.map(size => (
                    <div key={`active-${size}`} className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm">
                      Size: {size}
                      <button 
                        onClick={() => handleSizeToggle(size)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Sort selector */}
                <div className="flex items-center w-48">
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Recommended</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Products */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
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
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl">No products match your selected filters.</p>
                  <button 
                    onClick={clearAllFilters}
                    className="mt-4 text-cloth-charcoal hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <NotificationBanner />
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryPage;
