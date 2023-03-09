-- skip

SELECT `Student`.`id` AS "student", `Session`.`id` AS "session"
FROM `Session`
         LEFT OUTER JOIN `FormOfControl` ON `FormOfControl`.`id` = `Session`.`form_of_control`
         LEFT JOIN `Lesson` ON `Lesson`.`discipline` = `FormOfControl`.`discipline`
         LEFT JOIN `Student` ON `Student`.`group` = `Lesson`.`group`