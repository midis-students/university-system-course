import Api from "..";
import { Cathedra } from "../type";

export class CathedraModule {
  constructor(private api: Api) {}

  #path = "cathedra";

  getAll() {
    return this.api.request<Cathedra[]>(this.#path, {
      method: "GET",
    });
  }

  create(name: string) {
    return this.api.request<Cathedra>(this.#path, {
      method: "POST",
      body: {
        name,
      },
    });
  }

  update(id: number, body: Partial<Cathedra>) {
    return this.api.request<Cathedra>(this.#path, {
      method: "PATCH",
      body: {
        id,
        ...body,
      },
    });
  }
}
