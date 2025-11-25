import type { Pricing, Product } from "./types";

const N8N_API_BASE_URL = "https://jgaldamez.app.n8n.cloud";

type N8NAPIResponse<T = unknown> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

type N8NCrawlResponse = {
  body: {
    product: Product;
    pricing: Pricing;
  };
};

function request<T = unknown>(
  path: string,
  method = "GET",
  payload?: Record<string, any>
) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const response = await fetch(`${N8N_API_BASE_URL}/${path}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload ?? {}),
      });

      if (!response.ok) throw "Invalid response";

      const { success, data, error } =
        (await response.json()) as N8NAPIResponse<T>;

      if (!success) {
        reject(error ?? "Invalid response");
      }

      resolve(data as T);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getProductInfoFromURL({
  url,
  state,
}: {
  url: string;
  state: string;
}): Promise<N8NCrawlResponse["body"]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request<N8NCrawlResponse>(
        "webhook/luxyclip/crawler",
        "POST",
        {
          url: url,
          user_state: state,
          user_identifier: "234923042",
        }
      );
      resolve(response.body);
    } catch (error) {
      reject(error);
    }
  });
}
