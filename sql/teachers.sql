DROP PROCEDURE IF EXISTS `getTeachersCount`;
CREATE PROCEDURE `getTeachersCount`()
BEGIN
    SELECT COUNT(*) FROM `Teacher`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByCathedra`;
CREATE PROCEDURE `getTeachersByCathedra`(IN `cathedra` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`cathedra` = `cathedra`;
END;

DROP PROCEDURE IF EXISTS `getTeachersBySex`;
CREATE PROCEDURE `getTeachersBySex`(IN `sex` TINYINT(1))
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`sex` = `sex`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByDegree`;
CREATE PROCEDURE `getTeachersByDegree`(IN `degree` VARCHAR(64))
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`degree` = `degree`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByBirthYear`;
CREATE PROCEDURE `getTeachersByBirthYear`(IN `year` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE YEAR(`Teacher`.`birth_date`) = `year`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByAge`;
CREATE PROCEDURE `getTeachersByAge`(IN `age` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE TIMESTAMPDIFF(YEAR, `birth_date`, CURRENT_DATE()) = `age`;
END;

DROP PROCEDURE IF EXISTS `getTeachersBySalary`;
CREATE PROCEDURE `getTeachersBySalary`(IN `salary` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`salary` = `salary`;
END;

DROP PROCEDURE IF EXISTS `getTeachersBySemester`;
CREATE PROCEDURE `getTeachersBySemester`(IN `semester` INT)
BEGIN
    SELECT `Teacher`.*
    FROM `Lesson`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `Lesson`.`semester` = `semester`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByGroup`;
CREATE PROCEDURE `getTeachersByGroup`(IN `group` INT)
BEGIN
    SELECT `Teacher`.*
    FROM `Lesson`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `Lesson`.`group` = `group`
    GROUP BY `Teacher`.`id`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByCourse`;
CREATE PROCEDURE `getTeachersByCourse`(IN `course` INT)
BEGIN
    SELECT `Teacher`.*
    FROM `Lesson`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
             LEFT JOIN `Group` ON `Group`.`id` = `Lesson`.`group`
    WHERE `Group`.`course` = `course`
    GROUP BY `Teacher`.`id`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoad`;
CREATE PROCEDURE `getTeachersLoad`()
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadByType`;
CREATE PROCEDURE `getTeachersLoadByType`(IN `type` VARCHAR(64))
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`type` = `type`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadBySemester`;
CREATE PROCEDURE `getTeachersLoadBySemester`(IN `semester` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`semester` = `semester`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadByTeacher`;
CREATE PROCEDURE `getTeachersLoadByTeacher`(IN `teacher` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`teacher` = `teacher`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadByCathedra`;
CREATE PROCEDURE `getTeachersLoadByCathedra`(IN `cathedra` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `Teacher`.`cathedra` = `cathedra`;
END;

DROP PROCEDURE IF EXISTS `getTeacher`;
CREATE PROCEDURE `getTeacher`(IN `teacherId` INT)
BEGIN
    SELECT `Teacher`.*, `Cathedra`.`name` AS "cathedra"
    FROM `Teacher`
             LEFT JOIN `Cathedra` ON `Cathedra`.`id` = `Teacher`.`cathedra`
    WHERE `Teacher`.`id` = `teacherId`;
END;

DROP PROCEDURE IF EXISTS `getTeacherDiscipline`;
CREATE PROCEDURE `getTeacherDiscipline`(IN `teacherId` INT)
BEGIN
    SELECT `Lesson`.*, `Discipline`.`name` AS "discipline"
    FROM `Lesson`
             LEFT OUTER JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`teacher` = `teacherId`;
END;


CALL `getTeacherDiscipline`(4);