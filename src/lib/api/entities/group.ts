import { Entity } from "../entity";
import { Cathedra } from "./cathedra";

export class Group extends Entity {
  name: string;
  course: number;
  cathedra: Cathedra | number;
}
