import { Field } from "../lib/DatabaseUtils";
import { SQLQuery } from "../types/global";

export abstract class Entity {
  static definition: string[] = [];

  id: number;

  static Init(query: SQLQuery<unknown>) {
    const tableName = this.prototype.constructor.name;

    this.definition.unshift(Field("id", "INT PRIMARY KEY AUTO_INCREMENT"));

    return query(`
        CREATE TABLE if not exists  \`${tableName}\` (
            ${this.definition.join(",")}
        )
    `);
  }
}
