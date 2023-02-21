import { CathedraModule } from "./modules/cathedra";

type RequestConfig = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  query?: Record<string, string>;
};

export default class Api {
  static instance = new Api();
  private constructor() {}

  readonly cathedra = new CathedraModule(this);

  private readonly host = "https://midis-api.damirlut.online/";

  async request<T>(endpoint: string, config: RequestConfig): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const requestInit: RequestInit = {
      method: config.method,
      headers,
    };

    let url = this.host + endpoint;

    if (config.query) {
      url += "?" + new URLSearchParams(config.query).toString();
    }

    if (["POST", "PATCH"].includes(config.method) && config.body) {
      requestInit["body"] = JSON.stringify(config.body);
    }

    const response = await fetch(url, requestInit);
    const json = await response.json();

    if (response.status === 200) {
      if (json) return json;

      throw new Error(`Server error`);
    }

    throw new Error(json.message, { cause: json });
  }
}

/// @ts-ignore
window.api = Api.instance;
