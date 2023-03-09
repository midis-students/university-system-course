export type Group = {
  id: number;
  cathedra: string;
  cathedra_id: number;
  name: string;
  student_count: number;
};

export type Student = {
  birth_date: string;
  first_name: string;
  group: number;
  id: number;
  last_name: string;
  second_name: string;
  sex: boolean;
};
