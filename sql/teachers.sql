DROP PROCEDURE IF EXISTS `getTeachersCount`;
CREATE PROCEDURE `getTeachersCount`()
BEGIN
    SELECT COUNT(*) AS `count` FROM `Teacher`;
END;

DROP PROCEDURE IF EXISTS `getTeachers`;
CREATE PROCEDURE `getTeachers`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByCathedra`;
CREATE PROCEDURE `getTeachersByCathedra`(IN `cathedra` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`cathedra` = `cathedra` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersBySex`;
CREATE PROCEDURE `getTeachersBySex`(IN `sex` TINYINT(1), IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`sex` = `sex` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByDegree`;
CREATE PROCEDURE `getTeachersByDegree`(IN `degree` VARCHAR(64), IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`degree` = `degree` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByBirthYear`;
CREATE PROCEDURE `getTeachersByBirthYear`(IN `year` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE YEAR(`Teacher`.`birth_date`) = `year` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByAge`;
CREATE PROCEDURE `getTeachersByAge`(IN `age` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE TIMESTAMPDIFF(YEAR, `birth_date`, CURRENT_DATE()) = `age` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersBySalary`;
CREATE PROCEDURE `getTeachersBySalary`(IN `salary` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Teacher` WHERE `Teacher`.`salary` = `salary` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersBySemester`;
CREATE PROCEDURE `getTeachersBySemester`(IN `semester` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Teacher`.*
    FROM `Lesson`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `Lesson`.`semester` = `semester`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByGroup`;
CREATE PROCEDURE `getTeachersByGroup`(IN `group` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Teacher`.*
    FROM `Lesson`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `Lesson`.`group` = `group`
    GROUP BY `Teacher`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersByCourse`;
CREATE PROCEDURE `getTeachersByCourse`(IN `course` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Teacher`.*
    FROM `Lesson`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
             LEFT JOIN `Group` ON `Group`.`id` = `Lesson`.`group`
    WHERE `Group`.`course` = `course`
    GROUP BY `Teacher`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoad`;
CREATE PROCEDURE `getTeachersLoad`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadByType`;
CREATE PROCEDURE `getTeachersLoadByType`(IN `type` VARCHAR(64), IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`type` = `type`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadBySemester`;
CREATE PROCEDURE `getTeachersLoadBySemester`(IN `semester` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`semester` = `semester`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadByTeacher`;
CREATE PROCEDURE `getTeachersLoadByTeacher`(IN `teacher` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
    WHERE `Lesson`.`teacher` = `teacher`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeachersLoadByCathedra`;
CREATE PROCEDURE `getTeachersLoadByCathedra`(IN `cathedra` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Discipline`.`name` AS 'discipline', `hours`
    FROM `Lesson`
             LEFT JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
             LEFT JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `Teacher`.`cathedra` = `cathedra`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getTeacher`;
CREATE PROCEDURE `getTeacher`(IN `teacherId` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Teacher`.*, `Cathedra`.`name` AS "cathedra", `Cathedra`.`id` AS `cathedra_id`
    FROM `Teacher`
             LEFT JOIN `Cathedra` ON `Cathedra`.`id` = `Teacher`.`cathedra`
    WHERE `Teacher`.`id` = `teacherId`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `addTeacher`;
CREATE PROCEDURE `addTeacher`(IN `_first_name` VARCHAR(64), IN `_last_name` VARCHAR(64), IN `_second_name` VARCHAR(64),
                              IN `_sex` TINYINT(1), IN `_birth_date` DATE, IN `_phone` VARCHAR(12), IN `_degree` VARCHAR(64),
                              IN `_salary` INT,
                              IN `_cathedra` INT)
BEGIN
    INSERT INTO `Teacher`(`first_name`, `last_name`, `second_name`, `sex`, `birth_date`, `phone`, `degree`, `salary`,
                          `cathedra`) VALUE (`_first_name`, `_last_name`, `_second_name`, `_sex`, `_birth_date`,
                                             `_phone`,
                                             `_degree`, `_salary`,
                                             `_cathedra`);
    SELECT LAST_INSERT_ID() as `id`;
END;