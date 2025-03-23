
import React from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/services/paymentService';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <motion.div
      className="product-card flex flex-col subtle-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">{product.title}</h3>
            <button 
              onClick={handleAddToCart}
              className="text-cloth-charcoal hover:text-cloth-beige transition-colors"
              aria-label="Add to cart"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          <p className="text-sm font-medium">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
