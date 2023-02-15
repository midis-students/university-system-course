import { Field } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";
import { FormOfControl } from "./FormOfControl";
import { Semester } from "./Semester";

export class Session extends Entity {
  static override definition = [
    Field("semestr", "INT", Semester),
    Field("form_of_control", "INT", FormOfControl),
  ];
}
