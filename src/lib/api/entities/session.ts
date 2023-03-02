import { Entity } from "../entity";
import { Discipline } from "./discipline";
import { FormOfControl } from "./formofcontrol";
import { Semester } from "./semestr";

export class Session extends Entity {
  semester: Semester | number;
  form_of_control: FormOfControl | number;
}
