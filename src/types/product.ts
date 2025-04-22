
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  image: string;
  category: string;
  inStock: boolean;
  discountPercentage?: number;
  isFavorite?: boolean;
  variants?: ProductVariant[];
  colors?: ProductColor[];
  sizes?: string[];
  images?: string[];
  handle?: string;
}

export interface ProductColor {
  name: string;
  value: string;
  image: string;
  id?: string; // Added ID to allow navigation to specific product
}

export interface ProductVariant {
  id: string;
  title?: string;
  price: number;  // Keep as number for consistency with Product interface
  compareAtPrice?: number;  // Keep as number for consistency
  available: boolean;
  size?: string;
  color?: string;
  option1?: string; // e.g. Size
  option2?: string; // e.g. Color
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
  size?: string;
  color?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'created' | 'processing' | 'confirmed' | 'failed';
  createdAt: string;
}

export interface OrderConfirmation {
  orderId: string;
  total: number;
  items: CartItem[];
  status: string;
  paymentMethod: string;
  date: string;
}

export interface CollectionResponse {
  id: string;
  title: string;
  description: string;
  image: string;
  products: ShopifyProduct[];
  hasNextPage: boolean;
  nextCursor: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  images: string[];
  variants: ShopifyVariant[];
  handle?: string;
}

export interface ShopifyVariant {
  id: string;
  size: string;
  color: string;
  price: string;     // This is a string from the API
  compareAtPrice: string;  // This is a string from the API
  available: boolean;
}
