import { Field, Foreign } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";
import { Cathedra } from "./Сathedra";

export class Teacher extends Entity {
  static override definition = [
    Field("first_name", "VARCHAR(64)"),
    Field("last_name", "VARCHAR(64)"),
    Field("second_name", "VARCHAR(64)"),
    Field("sex", "BOOLEAN"),
    Field("birth_data", "DATE"),
    Field("phone", "VARCHAR(10)"),
    Field("degree", "VARCHAR(64)"),
    Field("cathedra", "INT", Cathedra),
  ];
  first_name: string;
  last_name: string;
  second_name: string;
  sex: boolean;
  birth_data: number;
  cathedra: Cathedra;
  degree: string;
  phone: string;
}
