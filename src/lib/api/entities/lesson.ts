import { Entity } from "../entity";
import { Discipline } from "./discipline";
import { Group } from "./group";
import { Semester } from "./semestr";
import { Teacher } from "./teacher";

export class Lesson extends Entity {
  discipline: Discipline | number;
  group: Group | number;
  teacher: Teacher | number;
  semester: Semester | number;
  type: string;
  hours: number;
}
