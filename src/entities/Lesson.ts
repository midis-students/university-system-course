import { Field, Foreign } from "../lib/DatabaseUtils";
import { Discipline } from "./Discipline";
import { Entity } from "./Entity";
import { Group } from "./Group";
import { Semester } from "./Semester";
import { Teacher } from "./Teacher";

export class Lesson extends Entity {
  static override definition = [
    Field("discipline", "INT", Discipline),
    Field("group", "INT", Group),
    Field("teacher", "INT", Teacher),
    Field("semester", "INT", Semester),
    Field("type", "VARCHAR(64)"),
    Field("hours", "INT"),
  ];

  discipline: Discipline;
  group: Group;
  teacher: Teacher;
  semester: Semester;
  type: string;
  hours: number;
}
