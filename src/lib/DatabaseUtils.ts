import { Entity } from "../entities/Entity";

type EntityClass = new () => Entity;

export function Foreign(key: string, reference: EntityClass) {
  return `FOREIGN KEY (\`${key}\`) REFERENCES\`${reference.name}\`(id)`;
}

export function Field(key: string, type: string, foreign?: EntityClass) {
  let sql = ` \`${key}\` ${type} NOT NULL`;

  if (foreign) {
    sql += "," + Foreign(key, foreign);
  }

  return sql;
}

export function InsertInto<T extends Entity>(
  entity: new () => T,
  fields: Partial<T>
) {
  const keys: string[] = [];
  const values: string[] = [];

  for (let [key, value] of Object.entries(fields)) {
    keys.push(`\`${key}\``);

    if (typeof value === "string") {
      value = `"${value}"`;
    }

    values.push(value);
  }

  return `INSERT INTO \`${
    entity.name
  }\`(${keys.join()}) VALUES (${values.join()})`;
}
