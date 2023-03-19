-- skip

SELECT `Session`.`semester`, `Discipline`.`cathedra`
FROM `Session`
         JOIN `FormOfControl` ON `FormOfControl`.`id` = `Session`.`form_of_control`
         JOIN `Discipline` ON `Discipline`.`id` = `FormOfControl`.`discipline`
GROUP BY `semester`, `cathedra`