
import backendRequest from "@/lib/request";
import {
  AddToCartPayload,
  AuthResponse,
  CartItem,
  CheckoutConfirmation,
  CheckoutSession,
  Collection,
  CollectionResponse,
  ConfirmCheckoutPayload,
  InitiateCheckoutPayload,
  NonceResponse,
  Product,
  RemoveCartItemPayload,
  RequestParams,
  ShopFilters,
  UpdateEmailPayload,
  UpdatePreferencePayload,
  UpdateShippingPayload,
  User,
  VerifyWalletLoginPayload,
  VerifyWorldcoinPayload,
  WorldcoinPrices,
  WorldcoinVerificationResponse,
} from "@/types/request";

interface ShopifyParams extends RequestParams {
  after?: string;
  first?: number;
}

interface SearchByTagsParams {
  tags: string[];
  first?: number;
  after?: string;
}

export const getProducts = async (
  params: ShopifyParams = {}
): Promise<Product[]> => {
  const response = await backendRequest<Product[]>(
    "GET",
    "shop/products",
    params
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch products. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getCollections = async (
  params: ShopifyParams = {}
): Promise<Collection[]> => {
  const response = await backendRequest<Collection[]>(
    "GET",
    "shop/collections",
    params
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch collections. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getCollectionProducts = async (
  collectionHandle: string,
  params: ShopifyParams = {}
): Promise<CollectionResponse> => {
  const response = await backendRequest<CollectionResponse>(
    "GET",
    `shop/collections/${collectionHandle}`,
    params
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch collection products. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getProductByHandle = async (handle: string): Promise<Product> => {
  const response = await backendRequest<Product>(
    "GET",
    `shop/product/${handle}`
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch product. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

interface SearchProductsParams extends RequestParams {
  query: string;
  first?: number;
}

export const searchProducts = async (
  params: SearchProductsParams
): Promise<Product[]> => {
  const response = await backendRequest<Product[]>(
    "GET",
    "shop/search",
    params
  );

  if (!response.data) {
    throw new Error(
      `Failed to search products. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getShopFilters = async (): Promise<ShopFilters> => {
  const response = await backendRequest<ShopFilters>("GET", "shop/filters");

  if (!response.data) {
    throw new Error(
      `Failed to fetch shop filters. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const generateNonce = async (): Promise<NonceResponse> => {
  const response = await backendRequest<NonceResponse>(
    "POST",
    "auth/generate-nonce"
  );

  if (!response.data) {
    throw new Error(
      `Failed to generate nonce. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const verifyWalletLogin = async (
  payload: VerifyWalletLoginPayload
): Promise<AuthResponse> => {
  const response = await backendRequest<AuthResponse>(
    "POST",
    "auth/verify-login",
    payload
  );

  if (!response.data) {
    throw new Error(
      `Failed to verify wallet login. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getWorldcoinOnchainPrices = async (): Promise<WorldcoinPrices> => {
  const response = await backendRequest<WorldcoinPrices>(
    "GET",
    "worldcoin/get-onchain-prices"
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch Worldcoin prices. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const verifyWorldcoinProof = async (
  payload: VerifyWorldcoinPayload,
  token: string
): Promise<WorldcoinVerificationResponse> => {
  const response = await backendRequest<WorldcoinVerificationResponse>(
    "POST",
    "worldcoin/verify",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to verify Worldcoin proof. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await backendRequest<User>(
    "GET",
    "user/me",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch current user. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const updateUserEmail = async (
  payload: UpdateEmailPayload,
  token: string
): Promise<User> => {
  const response = await backendRequest<User>("PATCH", "user/email", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to update email. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const updateUserShipping = async (
  payload: UpdateShippingPayload,
  token: string
): Promise<User> => {
  const response = await backendRequest<User>(
    "PATCH",
    "user/shipping",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to update shipping info. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const updateUserPreference = async (
  payload: UpdatePreferencePayload,
  token: string
): Promise<User> => {
  const response = await backendRequest<User>(
    "PATCH",
    "user/preference",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to update preference. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const getCart = async (token: string): Promise<CartItem[]> => {
  const response = await backendRequest<CartItem[]>(
    "GET",
    "cart",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to fetch cart. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const addToCart = async (
  payload: AddToCartPayload,
  token: string
): Promise<CartItem[]> => {
  const response = await backendRequest<CartItem[]>("POST", "cart", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.data) {
    throw new Error(
      `Failed to add to cart. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const clearCart = async (token: string): Promise<CartItem[]> => {
  const response = await backendRequest<CartItem[]>(
    "DELETE",
    "cart",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to clear cart. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const removeCartItem = async (
  payload: RemoveCartItemPayload,
  token: string
): Promise<CartItem[]> => {
  const response = await backendRequest<CartItem[]>(
    "DELETE",
    "cart/item",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to remove item from cart. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const initiateCheckout = async (
  payload: InitiateCheckoutPayload,
  token: string
): Promise<CheckoutSession> => {
  const response = await backendRequest<CheckoutSession>(
    "POST",
    "checkout/initiate",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to initiate checkout. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const confirmCheckout = async (
  payload: ConfirmCheckoutPayload,
  token: string
): Promise<CheckoutConfirmation> => {
  const response = await backendRequest<CheckoutConfirmation>(
    "POST",
    "checkout/confirm",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to confirm checkout. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};

export const searchProductsByTags = async (
  params: SearchByTagsParams
): Promise<Product[]> => {
  const { tags, first, after } = params;

  const response = await backendRequest<Product[]>(
    "GET",
    "shop/search-by-tags",
    {
      tags: tags.join(","),
      first,
      after,
    }
  );

  if (!response.data) {
    throw new Error(
      `Failed to search products by tags. Status: ${response.status}, Message: ${response.message}`
    );
  }

  return response.data;
};
