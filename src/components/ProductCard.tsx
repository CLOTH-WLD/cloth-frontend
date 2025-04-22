
import React from 'react';
import { Product } from '@/types/product';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/services/paymentService';
import { Button } from '@/components/ui/button';
import { toggleFavorite } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = product.price;
  // Fix: The discountedPrice is now the actual price and we don't need to recalculate it
  const discountedPrice = product.price;
  
  const { toast } = useToast();
  
  const handleAddToFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const isFavorite = await toggleFavorite(product.id);
      toast({
        title: isFavorite ? "Added to Favorites" : "Removed from Favorites",
        description: isFavorite 
          ? `${product.title} has been added to your favorites.` 
          : `${product.title} has been removed from your favorites.`,
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };
  
  // Truncate title to 36 characters and add ellipsis if needed
  const truncateTitle = (title: string) => {
    if (title.length <= 36) return title;
    return title.substring(0, 36) + '...';
  };
  
  return (
    <motion.div
      className="product-card flex flex-col subtle-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
            loading="lazy"
          />
          <Button
            onClick={handleAddToFavorites}
            className="absolute top-2 right-0 bg-white hover:bg-white/90 rounded-full p-1.5 shadow-sm"
            size="icon"
            variant="outline"
            aria-label={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${product.isFavorite ? 'text-red-500 fill-red-500' : 'text-black'}`} 
            />
          </Button>
          
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col space-y-2">
          <h3 className="font-helvetica text-sm leading-tight h-10">{truncateTitle(product.title)}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {formatCurrency(discountedPrice)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-gray-500 line-through">
                {formatCurrency(originalPrice * (1 / (1 - (product.discountPercentage as number) / 100)))}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
