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

CALL `getTeachersBySalary`(10000);