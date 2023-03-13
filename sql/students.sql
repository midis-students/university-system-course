DROP PROCEDURE IF EXISTS `getStudents`;
CREATE PROCEDURE `getStudents`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Student` LIMIT `skip`,`limit`;
END;


DROP PROCEDURE IF EXISTS `getStudentsCount`;
CREATE PROCEDURE `getStudentsCount`()
BEGIN
    SELECT COUNT(*) AS `count` FROM `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudent`;
CREATE PROCEDURE `getStudent`(IN `studentId` INT)
BEGIN
    SELECT `Student`.*,
           `Group`.`name`    AS `group_name`,
           `Group`.`course`,
           `Group`.`cathedra`,
           `Cathedra`.`name` AS `cathedra_name`
    FROM `Student`
             INNER JOIN `Group` ON `Group`.`id` = `Student`.`group`
             INNER JOIN `Cathedra` ON `Group`.`cathedra` = `Cathedra`.`id`
    WHERE `Student`.`id` = `studentId`;
END;

CALL `getStudent`(1);

DROP PROCEDURE IF EXISTS `getStudentsByGroup`;
CREATE PROCEDURE `getStudentsByGroup`(IN `group` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT * FROM `Student` WHERE `Student`.`group` = `group` LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByGroupCount`;
CREATE PROCEDURE `getStudentsByGroupCount`(IN `group` INT)
BEGIN
    SELECT COUNT(*) AS `count` FROM `Student` WHERE `Student`.`group` = `group`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByCathedra`;
CREATE PROCEDURE `getStudentsByCathedra`(IN `cathedra` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT *
    FROM `Student`
             LEFT JOIN `Group` ON `Student`.`group` = `Group`.`id`
    WHERE `Group`.`cathedra` = `cathedra`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByCathedraCount`;
CREATE PROCEDURE `getStudentsByCathedraCount`(IN `cathedra` INT)
BEGIN
    SELECT COUNT(*) AS `count`
    FROM `Student`
             LEFT JOIN `Group` ON `Student`.`group` = `Group`.`id`
    WHERE `Group`.`cathedra` = `cathedra`;
END;

DROP PROCEDURE IF EXISTS `getStudentsBySex`;
CREATE PROCEDURE `getStudentsBySex`(IN `sex` TINYINT(1), IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT *
    FROM `Student`
    WHERE `Student`.`sex` = `sex`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsBySexCount`;
CREATE PROCEDURE `getStudentsBySexCount`(IN `sex` TINYINT(1))
BEGIN
    SELECT COUNT(*) AS `count`
    FROM `Student`
    WHERE `Student`.`sex` = `sex`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByBirthYear`;
CREATE PROCEDURE `getStudentsByBirthYear`(IN `year` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT *
    FROM `Student`
    WHERE YEAR(`Student`.`birth_date`) = `year`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsByBirthYearCount`;
CREATE PROCEDURE `getStudentsByBirthYearCount`(IN `year` INT)
BEGIN
    SELECT COUNT(*) AS `count`
    FROM `Student`
    WHERE YEAR(`Student`.`birth_date`) = `year`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByAge`;
CREATE PROCEDURE `getStudentsByAge`(IN `age` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT *
    FROM `Student`
    WHERE TIMESTAMPDIFF(YEAR, `birth_date`, CURRENT_DATE()) = `age`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsByAgeCount`;
CREATE PROCEDURE `getStudentsByAgeCount`(IN `age` INT)
BEGIN
    SELECT COUNT(*) AS `count`
    FROM `Student`
    WHERE TIMESTAMPDIFF(YEAR, `birth_date`, CURRENT_DATE()) = `age`;
END;

DROP PROCEDURE IF EXISTS `getStudentsBySessionResult`;
CREATE PROCEDURE `getStudentsBySessionResult`(IN `discipline` INT, IN `mark` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Session` ON `Session`.`id` = `SessionResult`.`session`
             LEFT JOIN `FormOfControl` ON `FormOfControl`.`id` = `Session`.`form_of_control`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = `mark`
      AND `FormOfControl`.`discipline` = `discipline`
    GROUP BY `Student`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsBySessionResultCount`;
CREATE PROCEDURE `getStudentsBySessionResultCount`(IN `discipline` INT, IN `mark` INT)
BEGIN
    SELECT COUNT(`Student`) AS `count`
    FROM `SessionResult`
             LEFT JOIN `Session` ON `Session`.`id` = `SessionResult`.`session`
             LEFT JOIN `FormOfControl` ON `FormOfControl`.`id` = `Session`.`form_of_control`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = `mark`
      AND `FormOfControl`.`discipline` = `discipline`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsBySessionResultWithout`;
CREATE PROCEDURE `getStudentsBySessionResultWithout`(IN `mark` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` > `mark`
    GROUP BY `Student`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsBySessionResultWithoutCount`;
CREATE PROCEDURE `getStudentsBySessionResultWithoutCount`(IN `mark` INT)
BEGIN
    SELECT COUNT(`Student`) AS `count`
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` > `mark`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiser`;
CREATE PROCEDURE `getStudentsPromiser`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = 2
    GROUP BY `Student`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsPromiserCount`;
CREATE PROCEDURE `getStudentsPromiserCount`()
BEGIN
    SELECT COUNT(`Student`) AS `count`
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = 2
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiserByGroup`;
CREATE PROCEDURE `getStudentsPromiserByGroup`(IN `group` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = 2
      AND `Student`.`group` = `group`
    GROUP BY `Student`
    LIMIT `skip`,`limit`;
END;
DROP PROCEDURE IF EXISTS `getStudentsPromiserByGroupCount`;
CREATE PROCEDURE `getStudentsPromiserByGroupCount`(IN `group` INT)
BEGIN
    SELECT COUNT(`Student`) AS `count`
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = 2
      AND `Student`.`group` = `group`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiserByCathedra`;
CREATE PROCEDURE `getStudentsPromiserByCathedra`(IN `cathedra` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
             LEFT JOIN `Group` ON `Student`.`group` = `Group`.`id`
    WHERE `SessionResult`.`mark` = 2
      AND `Group`.`cathedra` = `cathedra`
    GROUP BY `Student`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiserByCathedraCount`;
CREATE PROCEDURE `getStudentsPromiserByCathedraCount`(IN `cathedra` INT)
BEGIN
    SELECT COUNT(`Student`) AS `count`
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
             LEFT JOIN `Group` ON `Student`.`group` = `Group`.`id`
    WHERE `SessionResult`.`mark` = 2
      AND `Group`.`cathedra` = `cathedra`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getSessionByStudent`;
CREATE PROCEDURE `getSessionByStudent`(IN `studentId` INT)
BEGIN
    SELECT `SessionResult`.`mark`, `Session`.`semester`, `FormOfControl`.`type`, `Discipline`.`name`
    FROM `SessionResult`
             JOIN `Session` ON `Session`.`id` = `SessionResult`.`session`
             JOIN `FormOfControl` ON `Session`.`form_of_control` = `FormOfControl`.`id`
             JOIN `Discipline` ON `FormOfControl`.`discipline` = `Discipline`.`id`
    WHERE `student` = `studentId`;
END;

CALL `getSessionByStudent`(1);