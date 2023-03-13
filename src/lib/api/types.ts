export type Count = {
  count: number;
};

export type Group = {
  id: number;
  cathedra: string;
  cathedra_id: number;
  name: string;
  student_count: number;
};

export type Student = {
  id: number;
  first_name: string;
  last_name: string;
  second_name: string;
  sex: number;
  birth_date: string;
  group: number;
  group_name: string;
  course: number;
  cathedra: number;
  cathedra_name: string;
};

export type Teacher = {
  birth_date: string;
  cathedra: number;
  cathedra_id: number;
  degree: string;
  first_name: string;
  id: number;
  last_name: string;
  phone: string;
  salary: number;
  second_name: string;
  sex: number;
};

export type Cathedra = {
  groups_count: number;
  id: number;
  name: string;
  students_count: number;
  teachers_count: number;
};

export type StudentSessionResult = {
  mark: number;
  name: string;
  semester: number;
  type: string;
};
export type StudentLesson = {
  discipline_name: string;
  lesson_type: string;
  teacher: string;
  teacher_id: number;
};
