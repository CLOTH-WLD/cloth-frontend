import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '@/lib/backendRequests'; 
import { toggleFavorite } from '@/services/productService';
import { Product, ProductVariant, ShopifyVariant } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Heart, ShoppingBag, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatCurrency } from '@/services/paymentService';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from '@/components/ui/carousel';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ShopifyProductDetail } from '@/types/request';
import { useQuery } from '@tanstack/react-query';

function extractShopifyNumericId(gid: string) {
  const matches = gid.match(/(\d+)$/);
  return matches ? matches[1] : gid;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const emblaApiRef = useRef<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => (id ? getProductById(id) : Promise.reject()),
    enabled: !!id
  });

  const uniqueColors = product ? [...new Set(product.variants.map(v => v.color))] : [];

  useEffect(() => {
    if (product) {
      if (uniqueColors.length > 0 && !selectedColor) {
        setSelectedColor(uniqueColors[0]);
      }
      updateAvailableSizesForColor(selectedColor || uniqueColors[0]);
    }
  }, [product, uniqueColors]);

  useEffect(() => {
    if (product && selectedColor) {
      updateAvailableSizesForColor(selectedColor);
    }
  }, [selectedColor, product]);

  function shopifyToProductVariant(variant: ShopifyVariant): ProductVariant {
    return {
      id: variant.id,
      price: parseFloat(variant.price),
      compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice) : undefined,
      available: variant.available,
      size: variant.size,
      color: variant.color,
    };
  }

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const shopifyVariant = product.variants.find(
        v => v.color === selectedColor && v.size === selectedSize
      );
      if (shopifyVariant) {
        setSelectedVariant(shopifyToProductVariant(shopifyVariant));
      } else {
        setSelectedVariant(null);
      }
    } else {
      setSelectedVariant(null);
    }
  }, [selectedColor, selectedSize, product]);

  const updateAvailableSizesForColor = (color: string) => {
    if (!product) return;
    const sizes = product.variants
      .filter(variant => variant.color === color)
      .map(variant => variant.size);
    const uniqueSizes = [...new Set(sizes)];
    setAvailableSizes(uniqueSizes);

    if (selectedSize && !uniqueSizes.includes(selectedSize)) {
      setSelectedSize(uniqueSizes.length > 0 ? uniqueSizes[0] : null);
    } else if (!selectedSize && uniqueSizes.length > 0) {
      setSelectedSize(uniqueSizes[0]);
    }
  };

  const getVariantByColorAndSize = (color: string, size: string): ShopifyVariant | undefined => {
    return product?.variants.find(v => v.color === color && v.size === size);
  };

  const isSizeAvailable = (size: string): boolean => {
    if (!product || !selectedColor) return false;
    const variant = getVariantByColorAndSize(selectedColor, size);
    return variant ? variant.available : false;
  };

  const getPrice = (): { price: number, compareAtPrice?: number } => {
    if (selectedVariant) {
      return {
        price: selectedVariant.price,
        compareAtPrice: selectedVariant.compareAtPrice
      };
    }
    if (product && product.variants.length > 0) {
      return {
        price: parseFloat(product.variants[0].price),
        compareAtPrice: product.variants[0].compareAtPrice
          ? parseFloat(product.variants[0].compareAtPrice)
          : undefined
      };
    }
    return { price: 0 };
  };

  const getDiscountPercentage = (): number | null => {
    const { price, compareAtPrice } = getPrice();
    if (compareAtPrice && compareAtPrice > price) {
      const discount = 100 - (price * 100 / compareAtPrice);
      return Math.round(discount);
    }
    return null;
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (selectedVariant) {
      if (!selectedVariant.available) {
        toast({
          title: "Out of Stock",
          description: `This combination is currently not available.`,
          variant: "destructive"
        });
        return;
      }

      addToCart(
        {
          id: extractShopifyNumericId(product.id),
          title: product.title,
          description: product.description,
          price: selectedVariant.price,
          compareAtPrice: selectedVariant.compareAtPrice,
          currency: 'USD',
          image: product.images[0],
          category: '',
          inStock: selectedVariant.available,
          images: product.images,
          handle: product.handle,
        },
        1,
        selectedVariant.id,
        selectedSize || undefined,
        selectedColor || undefined
      );

      toast({
        title: "Added to Cart",
        description: `${product.title} (${selectedSize}, ${selectedColor}) has been added to your cart.`,
      });
    } else if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive"
      });
    } else if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You must select a color before adding to cart.",
        variant: "destructive"
      });
    }
  };

  const handleToggleFavorite = useCallback(async () => {
    if (!product) return;
    try {
      const isFavorite = await toggleFavorite(extractShopifyNumericId(product.id));
      toast({
        title: isFavorite ? "Added to Favorites" : "Removed from Favorites",
        description: isFavorite 
          ? `${product.title} has been added to your favorites.` 
          : `${product.title} has been removed from your favorites.`,
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  }, [product, toast]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const imagesToDisplay = product?.images || [];

  const handleCarouselApi = useCallback((api: any) => {
    if (!api) return;
    emblaApiRef.current = api;
    setCurrentImageIndex(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    });
    return () => {
      api.off('select');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cloth-lightgray aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-cloth-lightgray rounded w-3/4"></div>
              <div className="h-6 bg-cloth-lightgray rounded w-1/4"></div>
              <div className="h-24 bg-cloth-lightgray rounded w-full"></div>
              <div className="h-12 bg-cloth-lightgray rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
          <p className="text-gray-600 mt-2">We couldn't find the product you're looking for.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const { price, compareAtPrice } = getPrice();
  const discountPercentage = getDiscountPercentage();
  const isOutOfStock = selectedVariant ? !selectedVariant.available : false;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm mb-6 text-cloth-mediumgray hover:text-cloth-charcoal transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Carousel 
              className="w-full relative" 
              setApi={handleCarouselApi}
            >
              <CarouselContent>
                {imagesToDisplay.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <img 
                        src={image} 
                        alt={`${product.title} - view ${index + 1}`}
                        className="w-full h-auto aspect-square object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1}/{imagesToDisplay.length}
              </div>
              <Button
                onClick={handleToggleFavorite}
                className="absolute top-3 right-3 bg-white hover:bg-white/90 rounded-full p-1.5 shadow-sm"
                size="icon"
                variant="outline"
                aria-label="Add to favorites"
              >
                <Heart className="h-5 w-5 text-black" />
              </Button>
              {discountPercentage && (
                <Badge 
                  className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white"
                >
                  Save {discountPercentage}%
                </Badge>
              )}
            </Carousel>
          </motion.div>
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-2xl font-semibold mb-2">
              {product.title}
              {selectedColor && (
                <span className="ml-2 text-base font-normal text-cloth-mediumgray">
                  - {selectedColor}
                </span>
              )}
            </h1>
            <div className="flex items-center mb-4">
              <p className="text-xl font-medium">
                {formatCurrency(price)}
              </p>
              {compareAtPrice && compareAtPrice > price && (
                <p className="text-gray-500 line-through ml-3">
                  {formatCurrency(compareAtPrice)}
                </p>
              )}
            </div>
            <p className="text-cloth-mediumgray mb-6">
              {product.description}
            </p>
            {uniqueColors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map((color) => {
                    const hasAvailableVariants = product.variants.some(
                      variant => variant.color === color && variant.available
                    );
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        disabled={!hasAvailableVariants}
                        className={cn(
                          "w-12 h-12 rounded-full border-2 transition-all relative",
                          selectedColor === color 
                            ? "border-black scale-110" 
                            : "border-transparent hover:border-gray-300",
                          !hasAvailableVariants && "opacity-50 cursor-not-allowed"
                        )}
                        aria-label={`Select ${color} color`}
                      >
                        <span 
                          className="block w-full h-full rounded-full bg-cover bg-center"
                          style={{ 
                            backgroundColor: color.toLowerCase(),
                            backgroundImage: `url(${
                              product.images[uniqueColors.indexOf(color) % product.images.length]
                            })`
                          }}
                        />
                        {!hasAvailableVariants && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                            <X className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <RadioGroup 
                  value={selectedSize || ''} 
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {availableSizes.map((size) => {
                    const isAvailable = isSizeAvailable(size);
                    return (
                      <div key={size} className="flex items-center">
                        <label
                          className={cn(
                            "flex items-center justify-center w-12 h-12 border rounded-md text-sm transition-all",
                            selectedSize === size && isAvailable
                              ? "bg-black text-white border-black" 
                              : "bg-white text-black border-gray-300 hover:border-gray-500",
                            !isAvailable && "opacity-50 cursor-not-allowed bg-gray-100 line-through"
                          )}
                        >
                          <RadioGroupItem 
                            value={size} 
                            className="sr-only" 
                            id={`size-${size}`} 
                            disabled={!isAvailable}
                          />
                          {size}
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || !selectedVariant}
              className={cn(
                "w-full flex items-center justify-center text-white py-3 px-6 rounded-md transition-colors",
                isOutOfStock || !selectedVariant
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cloth-charcoal hover:bg-black"
              )}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
            {isOutOfStock && (
              <p className="text-red-500 text-sm mt-2 text-center">
                This product is currently out of stock in the selected combination.
              </p>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
