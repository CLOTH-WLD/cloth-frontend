export interface BackendResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type RequestParams = Record<string, any>;

export interface Product {
  [key: string]: any;
}

export interface Collection {
  [key: string]: any;
}

export interface ShopFilters {
  [key: string]: any;
}

export interface NonceResponse {
  [key: string]: any;
}

export interface VerifyWalletLoginPayload {
  payload: {
    address: string;
    signature: string;
    message: string;
  };
  nonce: string;
}

export interface AuthResponse {
  [key: string]: any;
}

export interface WorldcoinPrices {
  [key: string]: any;
}

export interface VerifyWorldcoinPayload {
  payload: Record<string, any>;
  action: string;
  signal: string;
}

export interface WorldcoinVerificationResponse {
  [key: string]: any;
}

export interface User {
  [key: string]: any;
}

export interface UpdateEmailPayload {
  email: string;
}

export interface UpdateShippingPayload {
  full_name: string;
  address: string;
  phone: string;
  city: string;
  state_or_province: string;
  zip_or_postal_code: string;
  country: string;
}

export interface UpdatePreferencePayload {
  preference: string;
}

export interface CartItem {
  [key: string]: any;
}

export interface AddToCartPayload {
  product_id: string;
  variant_id: string;
  quantity: number;
}

export interface RemoveCartItemPayload {
  item_id: string;
}

export interface InitiateCheckoutPayload {
  voucher_code?: string;
}

export interface CheckoutSession {
  [key: string]: any;
}

export interface ConfirmCheckoutPayload {
  payload: {
    reference: string;
    transaction_id: string;
    transaction_hash: string;
    token: string;
    token_amount: string;
    status: string;
    from: string;
    chain: string;
    timestamp: string;
    version: number;
  };
}

export interface CheckoutConfirmation {
  [key: string]: any;
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
