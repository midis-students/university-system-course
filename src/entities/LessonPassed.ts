import { Field } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";
import { Lesson } from "./Lesson";

export class LessonPassed extends Entity {
  static override definition = [
    Field("lesson", "INT", Lesson),
    Field("date", "DATE"),
  ];
}
