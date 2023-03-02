import { Entity } from "../entity";
import { Group } from "./group";

export class Student extends Entity {
  first_name: string;
  last_name: string;
  second_name: string;
  sex: boolean;
  birth_date: string;
  group: Group | number;
}
