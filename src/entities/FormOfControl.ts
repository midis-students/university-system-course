import { Field, Foreign } from "../lib/DatabaseUtils";
import { Discipline } from "./Discipline";
import { Entity } from "./Entity";

export class FormOfControl extends Entity {
  static override definition = [
    Field("type", "VARCHAR(64)"),
    Field("discipline", "INT", Discipline),
  ];

  type: string;
  discipline: Discipline;
}
