import backendRequest from "@/lib/request";
import {
  Collection,
  Product,
  RequestParams,
  ShopFilters,
} from "@/types/request";

interface ShopifyParams extends RequestParams {
  after?: string;
  first?: number;
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
): Promise<Product[]> => {
  const response = await backendRequest<Product[]>(
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
