import Api from '.';
import { Entity } from './entity';

export type extractModuleEntity<Type> = Type extends Module<infer X> ? X : never;

export default class Module<Table extends Entity> {
  #path = '';
  constructor(private api: Api, private table: typeof Entity) {
    this.#path = this.table.path;
  }

  getAll() {
    return this.api.request<Table[]>(this.table.path, {
      method: 'GET',
    });
  }

  create(body: Partial<Table>) {
    return this.api.request<Table>(this.table.path, {
      method: 'POST',
      body,
    });
  }

  update(id: number, body: Partial<Table>) {
    return this.api.request<Table>(this.table.path, {
      method: 'PATCH',
      body: {
        id,
        ...body,
      },
    });
  }
}
