import { Field } from "../lib/DatabaseUtils";
import { Entity } from "./Entity";
import { Session } from "./Session";
import { Student } from "./Students";

export class SessionResult extends Entity {
  static override definition = [
    Field("session", "INT", Session),
    Field("student", "INT", Student),
    Field("mark", "INT"),
  ];
}
