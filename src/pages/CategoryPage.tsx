import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { getProductsByCategory, getAllProducts } from '@/services/productService';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import NotificationBanner from '@/components/NotificationBanner';
import { Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilterSheet from '@/components/FilterSheet';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [similarCategories, setSimilarCategories] = useState<string[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  
  // Filter sheet state
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;
  
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

        // Reset pagination when category changes
        setCurrentPage(1);
        
        // Fetch similar categories
        const allProducts = await getAllProducts();
        const categoriesSet = new Set<string>();
        allProducts.forEach(product => {
          // Get the main category type (e.g., "women's clothing" from "women's evening dresses")
          const mainCategory = product.category.split(' ')[0].toLowerCase();
          const currentMainCategory = decodedCategory.split(' ')[0].toLowerCase();
          
          if (
            mainCategory === currentMainCategory && 
            product.category !== decodedCategory
          ) {
            categoriesSet.add(product.category);
          }
        });
        setSimilarCategories(Array.from(categoriesSet).slice(0, 5));
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
    setShowDiscountedOnly(false);
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
    
    // Filter discounted items only
    if (showDiscountedOnly) {
      filtered = filtered.filter(product => 
        product.discountPercentage && product.discountPercentage > 0
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
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
  }, [products, priceRange, selectedColors, selectedSizes, sortBy, showDiscountedOnly]);

  const clearAllFilters = () => {
    setPriceRange(priceRange2);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('default');
    setShowDiscountedOnly(false);
    setOpenSheet(null);
  };
  
  const formattedCategory = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
    
  // Count active filters
  const activeFiltersCount = selectedColors.length + selectedSizes.length + (showDiscountedOnly ? 1 : 0);
  const isPriceRangeChanged = priceRange[0] !== priceRange2[0] || priceRange[1] !== priceRange2[1];
  const totalActiveFilters = activeFiltersCount + (isPriceRangeChanged ? 1 : 0);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
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
          {/* Filter buttons row */}
          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setOpenSheet('filter')}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setOpenSheet('sort')}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Sort
            </Button>
            
            {selectedColors.length > 0 && (
              <Button 
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setOpenSheet('color')}
              >
                Color ({selectedColors.length})
              </Button>
            )}
            
            {selectedSizes.length > 0 && (
              <Button 
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setOpenSheet('size')}
              >
                Size ({selectedSizes.length})
              </Button>
            )}
            
            {isPriceRangeChanged && (
              <Button 
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setOpenSheet('price')}
              >
                Price
              </Button>
            )}
            
            {showDiscountedOnly && (
              <Button 
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setShowDiscountedOnly(false)}
              >
                Sale
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
          
          {/* Product count and Clear All row */}
          <div className="flex justify-between items-center py-3 mb-2">
            <p className="text-sm text-cloth-mediumgray">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            
            {totalActiveFilters > 0 && (
              <Button 
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            )}
          </div>
          
          {/* Products grid */}
          <div className="mt-4">
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
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
            ) : currentProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {currentProducts.map((product, index) => (
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
          
          {/* Pagination */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={handlePreviousPage}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  <PaginationItem>
                    <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={handleNextPage} 
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          
          {/* Similar Categories */}
          {similarCategories.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">Similar Categories</h2>
              <div className="flex flex-wrap gap-2">
                {similarCategories.map(similarCategory => (
                  <Link 
                    key={similarCategory}
                    to={`/category/${encodeURIComponent(similarCategory)}`}
                    className="px-4 py-2 bg-cloth-lightbeige rounded-full text-sm hover:bg-cloth-beige transition-colors"
                  >
                    {similarCategory}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Filter Sheets */}
        <FilterSheet 
          open={openSheet === 'filter'} 
          onClose={() => setOpenSheet(null)}
          title="Filter Products"
        >
          <div className="space-y-6 p-4">
            {/* Price Range Filter */}
            <div className="border-b pb-4">
              <h3 className="text-sm font-medium mb-4">Price Range</h3>
              <FilterSheet.PriceRange 
                min={priceRange2[0]}
                max={priceRange2[1]}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
            </div>
            
            {/* Discounted Items Only */}
            <div className="border-b pb-4">
              <FilterSheet.Checkbox
                id="discounted-only"
                checked={showDiscountedOnly}
                onCheckedChange={setShowDiscountedOnly}
                label="Sale items only"
              />
            </div>
            
            {/* Colors Filter */}
            {allColors.length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium mb-4">Colors</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allColors.map((color) => (
                    <FilterSheet.Checkbox
                      key={color}
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => {
                        setSelectedColors(prev => 
                          prev.includes(color) 
                            ? prev.filter(c => c !== color) 
                            : [...prev, color]
                        );
                      }}
                      label={color}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Sizes Filter */}
            {allSizes.length > 0 && (
              <div className="pb-4">
                <h3 className="text-sm font-medium mb-4">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSizes(prev => 
                          prev.includes(size) 
                            ? prev.filter(s => s !== size) 
                            : [...prev, size]
                        );
                      }}
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
        </FilterSheet>
        
        {/* Sort Sheet */}
        <FilterSheet 
          open={openSheet === 'sort'} 
          onClose={() => setOpenSheet(null)}
          title="Sort By"
        >
          <div className="p-4">
            <FilterSheet.RadioGroup
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'default', label: 'Recommended' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'name-asc', label: 'Name: A to Z' },
                { value: 'name-desc', label: 'Name: Z to A' },
              ]}
            />
          </div>
        </FilterSheet>
        
        {/* Color Sheet */}
        <FilterSheet 
          open={openSheet === 'color'} 
          onClose={() => setOpenSheet(null)}
          title="Colors"
        >
          <div className="p-4 grid grid-cols-2 gap-2">
            {allColors.map((color) => (
              <FilterSheet.Checkbox
                key={color}
                id={`sheet-color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => {
                  setSelectedColors(prev => 
                    prev.includes(color) 
                      ? prev.filter(c => c !== color) 
                      : [...prev, color]
                  );
                }}
                label={color}
              />
            ))}
          </div>
        </FilterSheet>
        
        {/* Size Sheet */}
        <FilterSheet 
          open={openSheet === 'size'} 
          onClose={() => setOpenSheet(null)}
          title="Sizes"
        >
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSizes(prev => 
                      prev.includes(size) 
                        ? prev.filter(s => s !== size) 
                        : [...prev, size]
                    );
                  }}
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
        </FilterSheet>
        
        {/* Price Sheet */}
        <FilterSheet 
          open={openSheet === 'price'} 
          onClose={() => setOpenSheet(null)}
          title="Price Range"
        >
          <div className="p-4">
            <FilterSheet.PriceRange 
              min={priceRange2[0]}
              max={priceRange2[1]}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
            />
          </div>
        </FilterSheet>
        
        <NotificationBanner />
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default CategoryPage;
