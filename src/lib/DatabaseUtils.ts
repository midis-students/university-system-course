import { Entity } from "../entities/Entity";

export function Foreign(key: string, reference: new () => Entity) {
  return `FOREIGN KEY (\`${key}\`) REFERENCES\`${reference.name}\`(id)`;
}

export function Field(key: string, type: string, foreign?: new () => Entity) {
  let sql = ` \`${key}\` ${type} NOT NULL`;

  if (foreign) {
    sql += "," + Foreign(key, foreign);
  }

  return sql;
}
