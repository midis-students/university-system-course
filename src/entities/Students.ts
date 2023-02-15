import { Field, Foreign } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";
import { Group } from "./Group";

export class Student extends Entity {
  static override definition = [
    Field("first_name", "VARCHAR(64)"),
    Field("last_name", "VARCHAR(64)"),
    Field("second_name", "VARCHAR(64)"),
    Field("sex", "BOOLEAN"),
    Field("birth_data", "DATE"),
    Field("group", "INT", Group),
  ];

  first_name: string;
  last_name: string;
  second_name: string;
  sex: boolean;
  birth_data: number;
  group: Group;
}
