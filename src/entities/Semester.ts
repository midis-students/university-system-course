import { Field } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";

export class Semester extends Entity {
  static override definition = [Field("year", "YEAR")];

  year: number;
}
