
import React from 'react';
import { CartItem as CartItemType } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/services/paymentService';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size, color } = item;
  const navigate = useNavigate();
  
  const handleNavigateToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  // Determine display values for size and color
  const displaySize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
  const displayColor = color || (product.colors && product.colors.length > 0 ? product.colors[0]?.name : undefined);

  return (
    <motion.div 
      className="flex items-center py-4 border-b border-gray-100"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div 
        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
        onClick={handleNavigateToProduct}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3 
            className="text-sm cursor-pointer hover:underline"
            onClick={handleNavigateToProduct}
          >
            {product.title}
            {displayColor ? (
              <span className="ml-1 text-xs font-normal text-cloth-mediumgray">
                - {displayColor}
              </span>
            ) : null}
            {displaySize ? (
              <span className="ml-1 text-xs font-normal text-cloth-mediumgray">
                ({displaySize})
              </span>
            ) : null}
          </h3>
          <p className="ml-4 text-sm font-medium">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>

        {/* Show size and color if available */}
        {(displaySize || displayColor) && (
          <div className="mt-1 text-xs text-gray-500">
            <div className="flex space-x-2">
              {displaySize && (
                <span>Size: {displaySize}</span>
              )}
              {displaySize && displayColor && <span>•</span>}
              {displayColor && (
                <span>Color: {displayColor}</span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1.5 text-gray-500 hover:text-gray-700"
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3 text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1.5 text-gray-500 hover:text-gray-700"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="text-cloth-mediumgray hover:text-cloth-charcoal transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

