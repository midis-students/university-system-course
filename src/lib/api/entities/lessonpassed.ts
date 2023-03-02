import { Entity } from "../entity";
import { Lesson } from "./lesson";

export class LessonPassed extends Entity {
  lesson: Lesson | number;
  date: string;
}
