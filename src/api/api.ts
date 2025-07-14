type ApiConfig = {
  baseUrl: string;
  defaultToken?: string;
};

type RequestOptions = {
  params?: Record<string, string>;
  headers?: HeadersInit;
};

class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl;
    this.token = config.defaultToken;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async handleRequest<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<T> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options?.headers,
    });

    if (this.token) {
      headers.set('X-API-KEY', this.token);
    }

    const response = await fetch(
      `${this.baseUrl}${url}${
        options?.params
          ? `?${new URLSearchParams(options.params).toString()}`
          : ''
      }`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.handleRequest<T>(url, options);
  }

  async getById<T>(
    url: string,
    id: number,
    options?: RequestOptions,
  ): Promise<T> {
    return this.handleRequest<T>(`${url}/${id}`, options);
  }
}

export const Api = new ApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
  defaultToken: import.meta.env.VITE_API_TOKEN,
});
