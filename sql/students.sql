DROP PROCEDURE IF EXISTS `getStudentsCount`;
CREATE PROCEDURE `getStudentsCount`()
BEGIN
    SELECT COUNT(*) FROM `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByGroup`;
CREATE PROCEDURE `getStudentsByGroup`(IN `group` INT)
BEGIN
    SELECT * FROM `Student` WHERE `Student`.`group` = `group`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByCathedra`;
CREATE PROCEDURE `getStudentsByCathedra`(IN `cathedra` INT)
BEGIN
    SELECT *
    FROM `Student`
             LEFT JOIN `Group` ON `Student`.`group` = `Group`.`id`
    WHERE `Group`.`cathedra` = `cathedra`;
END;

DROP PROCEDURE IF EXISTS `getStudentsBySex`;
CREATE PROCEDURE `getStudentsBySex`(IN `sex` TINYINT(1))
BEGIN
    SELECT *
    FROM `Student`
    WHERE `Student`.`sex` = `sex`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByBirthYear`;
CREATE PROCEDURE `getStudentsByBirthYear`(IN `year` INT)
BEGIN
    SELECT *
    FROM `Student`
    WHERE YEAR(`Student`.`birth_date`) = `year`;
END;

DROP PROCEDURE IF EXISTS `getStudentsByAge`;
CREATE PROCEDURE `getStudentsByAge`(IN `age` INT)
BEGIN
    SELECT *
    FROM `Student`
    WHERE TIMESTAMPDIFF(YEAR, `birth_date`, CURRENT_DATE()) = `age`;
END;

DROP PROCEDURE IF EXISTS `getStudentsBySessionResult`;
CREATE PROCEDURE `getStudentsBySessionResult`(IN `discipline` INT, IN `mark` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Session` ON `Session`.`id` = `SessionResult`.`session`
             LEFT JOIN `FormOfControl` ON `FormOfControl`.`id` = `Session`.`form_of_control`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = `mark`
      AND `FormOfControl`.`discipline` = `discipline`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsBySessionResultWithout`;
CREATE PROCEDURE `getStudentsBySessionResultWithout`(IN `mark` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` > `mark`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiser`;
CREATE PROCEDURE `getStudentsPromiser`()
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = 2
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiserByGroup`;
CREATE PROCEDURE `getStudentsPromiserByGroup`(IN `group` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
    WHERE `SessionResult`.`mark` = 2
      AND `Student`.`group` = `group`
    GROUP BY `Student`;
END;

DROP PROCEDURE IF EXISTS `getStudentsPromiserByCathedra`;
CREATE PROCEDURE `getStudentsPromiserByCathedra`(IN `cathedra` INT)
BEGIN
    SELECT `Student`.*
    FROM `SessionResult`
             LEFT JOIN `Student` ON `Student`.`id` = `SessionResult`.`student`
             LEFT JOIN `Group` ON `Student`.`group` = `Group`.`id`
    WHERE `SessionResult`.`mark` = 2
      AND `Group`.`cathedra` = `cathedra`
    GROUP BY `Student`;
END;
