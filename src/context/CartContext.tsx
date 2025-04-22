import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '@/types/product';
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variantId?: string, size?: string, color?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cloth-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cloth-cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (product: Product, quantity: number = 1, variantId?: string, size?: string, color?: string) => {
    setItems(prevItems => {
      // Find by product ID and variant ID combination
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && item.variantId === variantId
      );
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        toast(`Added ${quantity} more to cart`);
        return updatedItems;
      } else {
        // Add new item with variant info
        const variantInfo = variantId ? { variantId, size, color } : {};
        const newItem: CartItem = { product, quantity, ...variantInfo };
        
        toast(`Added ${product.title} to cart`);
        return [...prevItems, newItem];
      }
    });
  };
  
  const removeFromCart = (productId: string, variantId?: string) => {
    setItems(prevItems => {
      // If variant ID is provided, filter by both product and variant
      if (variantId) {
        return prevItems.filter(item => !(item.product.id === productId && item.variantId === variantId));
      }
      // Otherwise just filter by product ID (for backward compatibility)
      return prevItems.filter(item => item.product.id !== productId);
    });
    toast("Item removed from cart");
  };
  
  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => {
        // Match by product ID and variant ID if provided
        if (item.product.id === productId && (!variantId || item.variantId === variantId)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast("Cart cleared");
  };
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => {
      const price = item.product.price;
      return total + price * item.quantity;
    }, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        itemCount,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
