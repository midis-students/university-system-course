import { Entity } from '../entity';
import { Cathedra } from './cathedra';

export class Teacher extends Entity {
  static path = 'teacher';
  first_name: string;
  last_name: string;
  second_name: string;
  sex: boolean;
  birth_date: string;
  cathedra: Cathedra | number;
  degree: string;
  phone: string;
}
