
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById, toggleFavorite } from '@/services/productService';
import { Product, ProductColor } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const emblaApiRef = useRef<any>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
          // Set default selections
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } else {
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, 1);
      toast({
        title: "Added to Cart",
        description: `${product.title} (${selectedSize}) has been added to your cart.`,
      });
    } else if (!selectedSize && product?.sizes?.length) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive"
      });
    }
  };
  
  const handleToggleFavorite = useCallback(async () => {
    if (!product) return;
    
    try {
      const isFavorite = await toggleFavorite(product.id);
      setProduct(prev => {
        if (!prev) return null;
        return { ...prev, isFavorite };
      });
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
  
  const handleColorChange = (color: ProductColor) => {
    if (color.name !== selectedColor?.name) {
      // Navigate to the product associated with this color
      navigate(`/product/${color.id || id}`);
    }
  };
  
  // Images to display in carousel
  const imagesToDisplay = selectedColor && product?.images 
    ? [selectedColor.image, ...product.images.filter(img => img !== selectedColor.image)]
    : product?.images || [product?.image || ''];
  
  // This function will update the currentImageIndex when the carousel slides
  const onCarouselSelect = useCallback((api: any) => {
    if (!api) return;
    
    const index = api.selectedScrollSnap();
    setCurrentImageIndex(index);
    
    // Store the API reference
    emblaApiRef.current = api;
  }, []);
  
  if (loading) {
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
  
  if (!product) return null;
  
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
              setApi={onCarouselSelect}
              onSelect={onCarouselSelect}
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
                aria-label={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  className={`h-5 w-5 ${product.isFavorite ? 'text-red-500 fill-red-500' : 'text-black'}`} 
                />
              </Button>
            </Carousel>
          </motion.div>
          
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
            <p className="text-xl font-medium mb-4">
              {formatCurrency(product.price)}
            </p>
            
            <p className="text-cloth-mediumgray mb-6">
              {product.description}
            </p>
            
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Colors</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor?.name === color.name 
                          ? "border-black scale-110" 
                          : "border-transparent hover:border-gray-300"
                      )}
                      aria-label={`Select ${color.name} color`}
                    >
                      <span 
                        className="block w-full h-full rounded-full" 
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <RadioGroup 
                  value={selectedSize || ''} 
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <label
                        className={cn(
                          "flex items-center justify-center w-12 h-12 border rounded-md cursor-pointer text-sm transition-all",
                          selectedSize === size 
                            ? "bg-black text-white border-black" 
                            : "bg-white text-black border-gray-300 hover:border-gray-500"
                        )}
                      >
                        <RadioGroupItem value={size} className="sr-only" id={`size-${size}`} />
                        {size}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-cloth-charcoal text-white py-3 px-6 rounded-md hover:bg-black transition-colors"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
