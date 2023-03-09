const baseUrl = 'http://localhost:5050/';
function request(method: string, ...args: any[]): Promise<any[]> {
  return fetch(baseUrl + method, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(args),
  }).then((res) => res.json());
}

// Procedures

/// helper.sql
export function getGroups(limit: number, skip: number) {
  return request('getGroups', [limit, skip]);
}
export function getGroup(groupId: number, limit: number, skip: number) {
  return request('getGroup', [groupId, limit, skip]);
}
/// students.sql
export function getStudents(limit: number, skip: number) {
  return request('getStudents', [limit, skip]);
}
export function getStudentsCount() {
  return request('getStudentsCount', []);
}
export function getStudentsByGroup(group: number, limit: number, skip: number) {
  return request('getStudentsByGroup', [group, limit, skip]);
}
export function getStudentsByCathedra(cathedra: number, limit: number, skip: number) {
  return request('getStudentsByCathedra', [cathedra, limit, skip]);
}
export function getStudentsBySex(sex: boolean, limit: number, skip: number) {
  return request('getStudentsBySex', [sex, limit, skip]);
}
export function getStudentsByBirthYear(year: number, limit: number, skip: number) {
  return request('getStudentsByBirthYear', [year, limit, skip]);
}
export function getStudentsByAge(age: number, limit: number, skip: number) {
  return request('getStudentsByAge', [age, limit, skip]);
}
export function getStudentsBySessionResult(
  discipline: number,
  mark: number,
  limit: number,
  skip: number,
) {
  return request('getStudentsBySessionResult', [discipline, mark, limit, skip]);
}
export function getStudentsBySessionResultWithout(mark: number, limit: number, skip: number) {
  return request('getStudentsBySessionResultWithout', [mark, limit, skip]);
}
export function getStudentsPromiser(limit: number, skip: number) {
  return request('getStudentsPromiser', [limit, skip]);
}
export function getStudentsPromiserByGroup(group: number, limit: number, skip: number) {
  return request('getStudentsPromiserByGroup', [group, limit, skip]);
}
export function getStudentsPromiserByCathedra(cathedra: number, limit: number, skip: number) {
  return request('getStudentsPromiserByCathedra', [cathedra, limit, skip]);
}
/// teachers.sql
export function getTeachersCount(limit: number, skip: number) {
  return request('getTeachersCount', [limit, skip]);
}
export function getTeachersByCathedra(cathedra: number, limit: number, skip: number) {
  return request('getTeachersByCathedra', [cathedra, limit, skip]);
}
export function getTeachersBySex(sex: boolean, limit: number, skip: number) {
  return request('getTeachersBySex', [sex, limit, skip]);
}
export function getTeachersByDegree(degree: string, limit: number, skip: number) {
  return request('getTeachersByDegree', [degree, limit, skip]);
}
export function getTeachersByBirthYear(year: number, limit: number, skip: number) {
  return request('getTeachersByBirthYear', [year, limit, skip]);
}
export function getTeachersByAge(age: number, limit: number, skip: number) {
  return request('getTeachersByAge', [age, limit, skip]);
}
export function getTeachersBySalary(salary: number, limit: number, skip: number) {
  return request('getTeachersBySalary', [salary, limit, skip]);
}
export function getTeachersBySemester(semester: number, limit: number, skip: number) {
  return request('getTeachersBySemester', [semester, limit, skip]);
}
export function getTeachersByGroup(group: number, limit: number, skip: number) {
  return request('getTeachersByGroup', [group, limit, skip]);
}
export function getTeachersByCourse(course: number, limit: number, skip: number) {
  return request('getTeachersByCourse', [course, limit, skip]);
}
export function getTeachersLoad(limit: number, skip: number) {
  return request('getTeachersLoad', [limit, skip]);
}
export function getTeachersLoadByType(type: string, limit: number, skip: number) {
  return request('getTeachersLoadByType', [type, limit, skip]);
}
export function getTeachersLoadBySemester(semester: number, limit: number, skip: number) {
  return request('getTeachersLoadBySemester', [semester, limit, skip]);
}
export function getTeachersLoadByTeacher(teacher: number, limit: number, skip: number) {
  return request('getTeachersLoadByTeacher', [teacher, limit, skip]);
}
export function getTeachersLoadByCathedra(cathedra: number, limit: number, skip: number) {
  return request('getTeachersLoadByCathedra', [cathedra, limit, skip]);
}
export function getTeacher(teacherId: number, limit: number, skip: number) {
  return request('getTeacher', [teacherId, limit, skip]);
}
export function getTeacherDiscipline(teacherId: number, limit: number, skip: number) {
  return request('getTeacherDiscipline', [teacherId, limit, skip]);
}
