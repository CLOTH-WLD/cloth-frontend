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
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// FilterSheet component
interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FilterSheet: React.FC<FilterSheetProps> = ({ open, onClose, title, children }) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] px-0 overflow-y-auto rounded-t-xl">
        <SheetHeader className="px-4 sticky top-0 bg-white z-10 border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>{title}</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        {children}
        <div className="sticky bottom-0 p-4 bg-white border-t mt-auto">
          <SheetClose asChild>
            <Button className="w-full" onClick={onClose}>
              Apply
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// FilterCheckbox component
interface FilterCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ 
  id, 
  checked, 
  onCheckedChange, 
  label 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
      />
      <label 
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

// PriceRangeFilter component
interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  min,
  max,
  value,
  onChange
}) => {
  return (
    <div className="px-2">
      <Slider
        defaultValue={[value[0], value[1]]}
        value={[value[0], value[1]]}
        max={max}
        min={min}
        step={1}
        onValueChange={(newValue) => onChange([newValue[0], newValue[1]])}
        className="mb-4"
      />
      <div className="flex justify-between text-sm">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};

// SortRadioGroup component
interface SortRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SortRadioGroup: React.FC<SortRadioGroupProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

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
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  
  // Filter sheet state
  const [openSheet, setOpenSheet] = useState<string | null>(null);
  
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
            
            {totalActiveFilters > 0 && (
              <Button 
                variant="ghost"
                size="sm"
                className="whitespace-nowrap text-red-500 hover:text-red-700"
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
            ) : filteredProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 gap-4"
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
              <PriceRangeFilter 
                min={priceRange2[0]}
                max={priceRange2[1]}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
            </div>
            
            {/* Discounted Items Only */}
            <div className="border-b pb-4">
              <FilterCheckbox
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
                    <FilterCheckbox
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
            <SortRadioGroup
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
              <FilterCheckbox
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
            <PriceRangeFilter 
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
