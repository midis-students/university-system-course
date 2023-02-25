import { Entity } from '../entity';
import { Cathedra } from './cathedra';

export class Teacher extends Entity {
  static path = 'teacher';
  first_name: string;
  last_name: string;
  second_name: string;
  sex: boolean;
  birth_data: number;
  cathedra: Cathedra;
  degree: string;
  phone: string;
}
