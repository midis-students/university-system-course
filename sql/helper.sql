DROP PROCEDURE IF EXISTS `getGroupsCount`;
CREATE PROCEDURE `getGroupsCount`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT COUNT(*) AS `count`
    FROM `Group`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getGroups`;
CREATE PROCEDURE `getGroups`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Group`.`id`,
           `Group`.`name`,
           `Group`.`course`,
           COUNT(`Student`.`id`) AS `student_count`,
           `Cathedra`.`name`     AS `cathedra`,
           `Cathedra`.`id`       AS `cathedra_id`
    FROM `Group`
             LEFT JOIN `Student` ON `Group`.`id` = `Student`.`group`
             LEFT OUTER JOIN `Cathedra` ON `Cathedra`.`id` = `Group`.`cathedra`
    GROUP BY `Group`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getGroup`;
CREATE PROCEDURE `getGroup`(IN `groupId` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Group`.`id`,
           `Group`.`name`,
           `Group`.`course`,
           COUNT(`Student`.`id`) AS `student_count`,
           `Cathedra`.`name`     AS `cathedra`,
           `Cathedra`.`id`       AS `cathedra_id`
    FROM `Group`
             LEFT JOIN `Student` ON `Group`.`id` = `Student`.`group`
             LEFT OUTER JOIN `Cathedra` ON `Cathedra`.`id` = `Group`.`cathedra`
    WHERE `Group`.`id` = `groupId`
    GROUP BY `Group`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getGroupByCathedra`;
CREATE PROCEDURE `getGroupByCathedra`(IN `cathedraId` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Group`.`id`,
           `Group`.`name`,
           `Group`.`course`,
           COUNT(`Student`.`id`) AS `student_count`,
           `Cathedra`.`name`     AS `cathedra`,
           `Cathedra`.`id`       AS `cathedra_id`
    FROM `Group`
             LEFT JOIN `Student` ON `Group`.`id` = `Student`.`group`
             LEFT OUTER JOIN `Cathedra` ON `Cathedra`.`id` = `Group`.`cathedra`
    WHERE `Group`.`cathedra` = `cathedraId`
    GROUP BY `Group`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getGroupByTeacher`;
CREATE PROCEDURE `getGroupByTeacher`(IN `teacherId` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Group`.*
    FROM `Lesson`
             JOIN `Group` ON `Group`.`id` = `Lesson`.`group`
    WHERE `Lesson`.`teacher` = `teacherId`
    LIMIT `skip`,`limit`;
END;


DROP PROCEDURE IF EXISTS `getCathedras`;
CREATE PROCEDURE `getCathedras`(IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Cath`.`id`,
           `Cath`.`name`,
           COUNT(`Group`.`id`)               AS `groups_count`,
           IFNULL(`StatsStudent`.`count`, 0) AS `students_count`,
           IFNULL(`StatsTeacher`.`count`, 0) AS `teachers_count`

    FROM `Cathedra` AS `Cath`
             LEFT JOIN `Group` ON `Cath`.`id` = `Group`.`cathedra`
             LEFT JOIN (SELECT `Group`.`cathedra`, COUNT(*) AS `count`
                        FROM `Student`
                                 INNER JOIN `Group` ON `Group`.`id` = `Student`.`group`
                        GROUP BY `Group`.`cathedra`) `StatsStudent` ON `Cath`.`id` = `StatsStudent`.`cathedra`
             LEFT JOIN (SELECT `Teacher`.`cathedra`, COUNT(*) AS `count`
                        FROM `Teacher`
                        GROUP BY `Teacher`.`cathedra`) `StatsTeacher` ON `Cath`.`id` = `StatsTeacher`.`cathedra`
    GROUP BY `Cath`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getCathedraById`;
CREATE PROCEDURE `getCathedraById`(IN `cathedraId` INT, IN `limit` INT, IN `skip` INT)
BEGIN
    SELECT `Cath`.`id`,
           `Cath`.`name`,
           COUNT(`Group`.`id`)               AS `groups_count`,
           IFNULL(`StatsStudent`.`count`, 0) AS `students_count`,
           IFNULL(`StatsTeacher`.`count`, 0) AS `teachers_count`

    FROM `Cathedra` AS `Cath`
             LEFT JOIN `Group` ON `Cath`.`id` = `Group`.`cathedra`
             LEFT JOIN (SELECT `Group`.`cathedra`, COUNT(*) AS `count`
                        FROM `Student`
                                 INNER JOIN `Group` ON `Group`.`id` = `Student`.`group`
                        GROUP BY `Group`.`cathedra`) `StatsStudent` ON `Cath`.`id` = `StatsStudent`.`cathedra`
             LEFT JOIN (SELECT `Teacher`.`cathedra`, COUNT(*) AS `count`
                        FROM `Teacher`
                        GROUP BY `Teacher`.`cathedra`) `StatsTeacher` ON `Cath`.`id` = `StatsTeacher`.`cathedra`
    WHERE `Cath`.`id` = `cathedraId`
    GROUP BY `Cath`.`id`
    LIMIT `skip`,`limit`;
END;

DROP PROCEDURE IF EXISTS `getLessonsByGroup`;
CREATE PROCEDURE `getLessonsByGroup`(IN `groupId` INT)
BEGIN
    SELECT `Discipline`.`name` AS `discipline_name`,
           `Lesson`.`type`     AS `lesson_type`,
           CONCAT(`Teacher`.`last_name`, ' ', LEFT(`Teacher`.`first_name`,1), '.', LEFT(`Teacher`.`second_name`,1), '.') as `teacher`,
           `Teacher`.id as `teacher_id`
    FROM `Lesson`
             JOIN `Discipline` ON `Discipline`.`id` = `Lesson`.`discipline`
             JOIN `Teacher` ON `Teacher`.`id` = `Lesson`.`teacher`
    WHERE `group` = `groupId`;
END;
