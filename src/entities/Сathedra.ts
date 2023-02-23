import { Field } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";

export class Cathedra extends Entity {
  static override definition = [
    Field("name", "VARCHAR(128)"),
    Field("phone", `VARCHAR(12) DEFAULT "" `),
  ];

  name: string;
  phone: string;
}
