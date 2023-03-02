import { Entity } from "../entity";
import { Discipline } from "./discipline";

export class FormOfControl extends Entity {
  type: string;
  discipline: Discipline | number;
}
