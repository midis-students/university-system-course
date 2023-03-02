import Module from "./module";
import { Cathedra, Teacher } from "./entities";
import { Group } from "./entities/group";
import { Student } from "./entities/student";
import { Discipline } from "./entities/discipline";

type RequestConfig = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  query?: Record<string, string>;
};

export default class Api {
  static instance = new Api();
  private constructor() {}

  readonly cathedra = new Module<Cathedra>(this, Cathedra);
  readonly teacher = new Module<Teacher>(this, Teacher);
  readonly group = new Module<Group>(this, Group);
  readonly student = new Module<Student>(this, Student);
  readonly discipline = new Module<Discipline>(this, Discipline);

  private readonly host = "/api/";

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
