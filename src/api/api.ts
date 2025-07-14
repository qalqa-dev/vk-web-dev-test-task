class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async get(url: string, params?: Record<string, string>) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['X-API-KEY'] = this.token;
    }

    const response = await fetch(
      `${this.baseUrl}${url}${
        params ? `?${new URLSearchParams(params).toString()}` : ''
      }`,
      { headers },
    );
    return response.json();
  }

  async getById(url: string, id: string) {
    return this.get(`${url}/${id}`);
  }
}

export const Api = new ApiClient('https://swapi.info/api/', '');
