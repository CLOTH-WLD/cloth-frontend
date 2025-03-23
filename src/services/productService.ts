
import { Product } from '@/types/product';

// Mock data for products until we integrate with Shopify
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft premium cotton t-shirt with a relaxed fit and minimalist design.',
    price: 29.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'T-Shirts',
    inStock: true,
    discountPercentage: 20,
  },
  {
    id: '2',
    title: 'Slim Fit Chinos',
    description: 'Modern slim fit chinos made from stretch cotton for comfort and mobility.',
    price: 59.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pants',
    inStock: true,
  },
  {
    id: '3',
    title: 'Oversized Knit Sweater',
    description: 'Cozy oversized knit sweater with dropped shoulders for an effortless look.',
    price: 79.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Sweaters',
    inStock: true,
    discountPercentage: 15,
  },
  {
    id: '4',
    title: 'Lightweight Linen Shirt',
    description: 'Breathable linen shirt with a relaxed cut, perfect for warm weather.',
    price: 49.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Shirts',
    inStock: true,
  },
  {
    id: '5',
    title: 'Merino Wool Beanie',
    description: 'Soft merino wool beanie with a minimalist design and ribbed texture.',
    price: 34.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    inStock: true,
    discountPercentage: 30,
  },
  {
    id: '6',
    title: 'Cotton Twill Cap',
    description: 'Classic 6-panel cotton twill cap with adjustable strap closure.',
    price: 24.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: '7',
    title: 'Relaxed Denim Jacket',
    description: 'Vintage-inspired relaxed fit denim jacket with a washed finish.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear',
    inStock: true,
  },
  {
    id: '8',
    title: 'Cropped Wide-Leg Pants',
    description: 'High-waisted wide-leg pants with a cropped length for a modern silhouette.',
    price: 69.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pants',
    inStock: true,
    discountPercentage: 25,
  },
];

export const getAllProducts = async (): Promise<Product[]> => {
  // In a real implementation, this would be a fetch to your Shopify API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  // In a real implementation, this would be a fetch to your Shopify API
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      resolve(product);
    }, 300);
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // In a real implementation, this would be a fetch to your Shopify API
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.category === category);
      resolve(products);
    }, 300);
  });
};
