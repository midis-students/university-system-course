import { Field, Foreign } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";
import { Cathedra } from "./Сathedra";

export class Group extends Entity {
  static override definition = [
    Field("name", "VARCHAR(48)"),
    Field("course", "INT"),
    Field("cathedra", "INT", Cathedra),
  ];

  name: string;
  course: number;
  cathedra: Cathedra;
}
