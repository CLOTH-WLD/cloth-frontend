
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  inStock: boolean;
  variants?: ProductVariant[];
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
