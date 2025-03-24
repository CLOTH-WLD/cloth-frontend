
import { Product } from '@/types/product';

// Mock data for products until we integrate with Shopify
const mockProducts: Product[] = [
  // Men's products
  {
    id: '1',
    title: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft premium cotton t-shirt with a relaxed fit and minimalist design.',
    price: 29.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Men's T-Shirts",
    inStock: true,
    discountPercentage: 20,
    isFavorite: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { 
        name: 'White', 
        value: '#FFFFFF', 
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Black', 
        value: '#000000', 
        image: 'https://images.unsplash.com/photo-1618677831708-0e7fda3148b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Navy', 
        value: '#0A1F4A', 
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597843722681-5c6c039f0763?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618677831708-0e7fda3148b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
  },
  {
    id: '2',
    title: 'Slim Fit Chinos',
    description: 'Modern slim fit chinos made from stretch cotton for comfort and mobility.',
    price: 59.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Men's Pants",
    inStock: true,
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Khaki', value: '#D2B48C', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Navy', value: '#0A1F4A', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '3',
    title: 'Oversized Knit Sweater',
    description: 'Cozy oversized knit sweater with dropped shoulders for an effortless look.',
    price: 79.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Men's Sweaters",
    inStock: true,
    discountPercentage: 15,
    isFavorite: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', value: '#F5F5DC', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Gray', value: '#808080', image: 'https://images.unsplash.com/photo-1516720826308-9637f3d70cc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '4',
    title: 'Lightweight Linen Shirt',
    description: 'Breathable linen shirt with a relaxed cut, perfect for warm weather.',
    price: 49.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Men's Shirts",
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF', image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Blue', value: '#ADD8E6', image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  
  // Women's products
  {
    id: '5',
    title: 'Floral Maxi Dress',
    description: 'Elegant floral print maxi dress with a flattering silhouette for any occasion.',
    price: 69.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Women's Dresses",
    inStock: true,
    discountPercentage: 10,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Floral', value: '#FFB6C1', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Blue', value: '#87CEEB', image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe6a8d97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '6',
    title: 'High-Waisted Jeans',
    description: 'Classic high-waisted jeans with a straight leg cut and vintage-inspired design.',
    price: 59.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Women's Jeans",
    inStock: true,
    isFavorite: true,
    sizes: ['24', '26', '28', '30', '32'],
    colors: [
      { name: 'Blue', value: '#0000FF', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '7',
    title: 'Oversized Blazer',
    description: 'Stylish oversized blazer perfect for creating a sophisticated yet relaxed look.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Women's Outerwear",
    inStock: true,
    discountPercentage: 20,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Beige', value: '#F5F5DC', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '8',
    title: 'Cotton T-Shirt',
    description: 'Classic cotton t-shirt with a flattering cut and extreme softness.',
    price: 19.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Women's T-Shirts",
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#FFFFFF', image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  
  // Kids' products
  {
    id: '9',
    title: 'Dinosaur Print T-Shirt',
    description: 'Fun dinosaur print t-shirt made from soft cotton for maximum comfort and durability.',
    price: 15.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Kids' T-Shirts",
    inStock: true,
    discountPercentage: 10,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Blue', value: '#0000FF', image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Green', value: '#008000', image: 'https://images.unsplash.com/photo-1519278401089-ea99fa1809b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '10',
    title: 'Denim Overalls',
    description: 'Classic denim overalls with adjustable straps and plenty of pockets for adventure.',
    price: 34.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Kids' Clothing",
    inStock: true,
    isFavorite: true,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Blue', value: '#0000FF', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '11',
    title: 'Light-Up Sneakers',
    description: 'Fun light-up sneakers that flash with every step for maximum playground appeal.',
    price: 39.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1551180452-aea851b23ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Kids' Shoes",
    inStock: true,
    discountPercentage: 15,
    sizes: ['EU 28', 'EU 30', 'EU 32', 'EU 34'],
    colors: [
      { name: 'Blue', value: '#0000FF', image: 'https://images.unsplash.com/photo-1551180452-aea851b23ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Pink', value: '#FFC0CB', image: 'https://images.unsplash.com/photo-1551180452-aea851b23ac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '12',
    title: 'Colorful Backpack',
    description: 'Durable and colorful backpack with fun patterns, perfect for school or day trips.',
    price: 29.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1628149453636-23e882efb8d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Kids' Backpacks",
    inStock: true,
    colors: [
      { name: 'Rainbow', value: '#FF0000', image: 'https://images.unsplash.com/photo-1628149453636-23e882efb8d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Blue', value: '#0000FF', image: 'https://images.unsplash.com/photo-1598537179751-78262b048fc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  
  // Accessories
  {
    id: '13',
    title: 'Merino Wool Beanie',
    description: 'Soft merino wool beanie with a minimalist design and ribbed texture.',
    price: 34.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Men's Accessories",
    inStock: true,
    discountPercentage: 30,
    sizes: ['One Size'],
    colors: [
      { name: 'Gray', value: '#808080', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '14',
    title: 'Leather Belt',
    description: 'Classic leather belt with a brushed metal buckle, perfect for everyday wear.',
    price: 45.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1624222247344-a05bea593b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Men's Belts",
    inStock: true,
    sizes: ['85cm', '90cm', '95cm', '100cm'],
    colors: [
      { name: 'Brown', value: '#8B4513', image: 'https://images.unsplash.com/photo-1624222247344-a05bea593b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '15',
    title: 'Pearl Necklace',
    description: 'Elegant freshwater pearl necklace with a delicate sterling silver chain.',
    price: 79.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Women's Jewelry",
    inStock: true,
    isFavorite: true,
    sizes: ['40cm', '45cm'],
    colors: [
      { name: 'Pearl', value: '#FDEEF4', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    id: '16',
    title: 'Silk Scarf',
    description: 'Luxurious silk scarf with a vibrant pattern, perfect for adding a touch of elegance to any outfit.',
    price: 49.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1584559582128-b8be739912e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: "Women's Accessories",
    inStock: true,
    discountPercentage: 15,
    colors: [
      { name: 'Multicolor', value: '#FF00FF', image: 'https://images.unsplash.com/photo-1584559582128-b8be739912e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { name: 'Blue', value: '#0000FF', image: 'https://images.unsplash.com/photo-1606293926249-ed2f08324a5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
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
      const normalizedCategory = category.toLowerCase();
      const products = mockProducts.filter(p => 
        p.category.toLowerCase().includes(normalizedCategory)
      );
      resolve(products);
    }, 300);
  });
};

export const getFavoriteProducts = async (): Promise<Product[]> => {
  // In a real implementation, this would fetch favorite products from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      const favorites = mockProducts.filter(p => p.isFavorite === true);
      resolve(favorites);
    }, 300);
  });
};

export const toggleFavorite = async (productId: string): Promise<boolean> => {
  // This would be a real API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      const productIndex = mockProducts.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        mockProducts[productIndex].isFavorite = !mockProducts[productIndex].isFavorite;
        resolve(mockProducts[productIndex].isFavorite || false);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

export const getAllCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  mockProducts.forEach(product => {
    categoriesSet.add(product.category);
  });
  return Array.from(categoriesSet);
};

