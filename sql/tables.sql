-- skip
CREATE TABLE `Cathedra`
(
    `id`    INT PRIMARY KEY AUTO_INCREMENT,
    `name`  VARCHAR(128) NOT NULL,
    `phone` VARCHAR(12)  NOT NULL
);

CREATE TABLE `Discipline`
(
    `id`       INT PRIMARY KEY AUTO_INCREMENT,
    `name`     VARCHAR(128) NOT NULL,
    `cathedra` INT          NOT NULL,

    FOREIGN KEY (`cathedra`) REFERENCES `Cathedra` (`id`)
);

CREATE TABLE `FormOfControl`
(
    `id`         INT PRIMARY KEY AUTO_INCREMENT,
    `type`       VARCHAR(128) NOT NULL,
    `discipline` INT          NOT NULL,

    FOREIGN KEY (`discipline`) REFERENCES `Discipline` (`id`)
);

CREATE TABLE `Group`
(
    `id`       INT PRIMARY KEY AUTO_INCREMENT,
    `name`     VARCHAR(128)  NOT NULL,
    `course`   INT DEFAULT 1 NOT NULL,
    `cathedra` INT           NOT NULL,

    FOREIGN KEY (`cathedra`) REFERENCES `Cathedra` (`id`)
);

CREATE TABLE `Semester`
(
    `id`   INT PRIMARY KEY AUTO_INCREMENT,
    `year` VARCHAR(9) NOT NULL
);

CREATE TABLE `Teacher`
(
    `id`          INT PRIMARY KEY AUTO_INCREMENT,
    `first_name`  VARCHAR(64) NOT NULL,
    `last_name`   VARCHAR(64) NOT NULL,
    `second_name` VARCHAR(64) NOT NULL,
    `gender`         TINYINT(1)  NOT NULL,
    `birth_date`  DATE        NOT NULL,
    `phone`       VARCHAR(12) NOT NULL,
    `degree`      VARCHAR(64) NOT NULL,
    `salary`      INT         NOT NULL,
    `cathedra`    INT         NOT NULL,

    FOREIGN KEY (`cathedra`) REFERENCES `Cathedra` (`id`)
);

CREATE TABLE `Student`
(
    `id`          INT PRIMARY KEY AUTO_INCREMENT,
    `first_name`  VARCHAR(64) NOT NULL,
    `last_name`   VARCHAR(64) NOT NULL,
    `second_name` VARCHAR(64) NOT NULL,
    `gender`         TINYINT(1)  NOT NULL,
    `birth_date`  DATE        NOT NULL,
    `group`       INT         NOT NULL,

    FOREIGN KEY (`group`) REFERENCES `Group` (`id`)
);

CREATE TABLE `Lesson`
(
    `id`         INT PRIMARY KEY AUTO_INCREMENT,
    `discipline` INT         NOT NULL,
    `group`      INT         NOT NULL,
    `teacher`    INT         NOT NULL,
    `semester`   INT         NOT NULL,
    `type`       VARCHAR(64) NOT NULL,
    `hours`      INT DEFAULT 0,

    FOREIGN KEY (`discipline`) REFERENCES `Discipline` (`id`),
    FOREIGN KEY (`group`) REFERENCES `Group` (`id`),
    FOREIGN KEY (`teacher`) REFERENCES `Teacher` (`id`),
    FOREIGN KEY (`semester`) REFERENCES `Semester` (`id`)
);

CREATE TABLE `LessonPassed`
(
    `id`     INT PRIMARY KEY AUTO_INCREMENT,
    `lesson` INT NOT NULL,
    `date`   DATE,

    FOREIGN KEY (`lesson`) REFERENCES `Lesson` (`id`)
);

CREATE TABLE `Session`
(
    `id`              INT PRIMARY KEY AUTO_INCREMENT,
    `semester`        INT NOT NULL,
    `form_of_control` INT NOT NULL,

    FOREIGN KEY (`semester`) REFERENCES `Semester` (`id`),
    FOREIGN KEY (`form_of_control`) REFERENCES `FormOfControl` (`id`)
);

CREATE TABLE `SessionResult`
(
    `id`      INT PRIMARY KEY AUTO_INCREMENT,
    `session` INT NOT NULL,
    `student` INT NOT NULL,
    `mark`    TINYINT(1),

    FOREIGN KEY (`session`) REFERENCES `Session` (`id`),
    FOREIGN KEY (`student`) REFERENCES `Student` (`id`)
)