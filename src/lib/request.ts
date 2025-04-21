import { BACKEND_URL } from "@/lib/constants";
import { BackendResponse, HttpMethod, RequestParams } from "@/types/request";

async function backendRequest<T>(
  method: HttpMethod,
  path: string,
  paramsOrBody: RequestParams = {},
  options: {
    retries?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
  } = {}
): Promise<BackendResponse<T>> {
  const { retries = 2, retryDelay = 1000, headers = {} } = options;
  let lastError: Error | null = null;
  let attempt = 0;

  while (attempt <= retries) {
    try {
      if (!BACKEND_URL) {
        console.error(
          "BACKEND_URL is not defined. Check your environment variables."
        );
        throw new Error("Backend URL is not configured properly");
      }

      let url = `${
        BACKEND_URL.endsWith("/") ? BACKEND_URL.slice(0, -1) : BACKEND_URL
      }/${path}`;

      if (method === "GET" && Object.keys(paramsOrBody).length) {
        const queryParams = new URLSearchParams();
        Object.entries(paramsOrBody).forEach(([key, value]) => {
          queryParams.append(key, String(value));
        });
        url += `?${queryParams.toString()}`;
      }

      console.log(`[Network] ${method} request to: ${url}`);

      const requestOptions: RequestInit = {
        method,
        headers,
        ...(method === "POST" || method === "PATCH" || method === "DELETE"
          ? {
              headers: {
                "Content-Type": "application/json",
                ...headers,
              },
              body: JSON.stringify(paramsOrBody),
            }
          : {}),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}${
            errorText ? " - " + errorText : ""
          }`
        );
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.warn(`Expected JSON response but got ${contentType}`);
        const textResponse = await response.text();
        console.error(
          "Non-JSON response:",
          textResponse.substring(0, 200) + "..."
        );
        throw new Error(
          `API returned non-JSON response with content type: ${contentType}`
        );
      }

      const result: BackendResponse<T> = await response.json();

      if (result.status < 200 || result.status >= 300) {
        throw new Error(
          `API Error: ${response.status} - ${
            result?.message || "Unknown error"
          }`
        );
      }

      console.log(`[Network] Success response from ${path}`);
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      attempt++;

      console.error(
        `[Network] Request to ${path} failed (attempt ${attempt}/${
          retries + 1
        }):`,
        lastError
      );

      if (attempt <= retries) {
        console.warn(`[Network] Retrying in ${retryDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  throw lastError || new Error(`All ${retries + 1} attempts to ${path} failed`);
}

export default backendRequest;
