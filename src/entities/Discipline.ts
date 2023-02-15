import { Field } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";

export class Discipline extends Entity {
  static override definition = [Field("name", "VARCHAR(128)")];

  name: string;
}
