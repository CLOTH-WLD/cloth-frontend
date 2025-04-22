
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
}

export interface ProductColor {
  name: string;
  value: string;
  image: string;
  id?: string; // Added ID to allow navigation to specific product
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
  option1?: string; // e.g. Size
  option2?: string; // e.g. Color
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
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
}

export interface ShopifyVariant {
  id: string;
  size: string;
  color: string;
  price: string;
  compareAtPrice: string;
  available: boolean;
}
