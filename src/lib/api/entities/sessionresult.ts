import { Entity } from "../entity";
import { Session } from "./session";
import { Student } from "./student";

export class SessionResult extends Entity {
  student: Student | number;
  session: Session | number;
  mark: number;
}
