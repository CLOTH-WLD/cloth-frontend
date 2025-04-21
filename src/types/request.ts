export interface BackendResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type HttpMethod = "GET" | "POST";

export type RequestParams = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | RequestParams
    | RequestParams[];
};

export interface Product {
  [key: string]: any;
}

export interface Collection {
  [key: string]: any;
}

export interface ShopFilters {
  [key: string]: any;
}
