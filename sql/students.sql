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
