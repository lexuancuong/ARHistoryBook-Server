DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS SectionProgress;
DROP TABLE IF EXISTS ActivityProgress;
DROP TABLE IF EXISTS SectionStatus;
DROP TABLE IF EXISTS ActivityData;
DROP TABLE IF EXISTS SectionData;
DROP TABLE IF EXISTS Lesson;
DROP TABLE IF EXISTS Chapter;
DROP TABLE IF EXISTS Part;
DROP TABLE IF EXISTS Grade;
DROP TABLE IF EXISTS AchievementAccount;
DROP TABLE IF EXISTS Achievement;
DROP TABLE IF EXISTS SectionLink;
DROP TABLE IF EXISTS AcountAchievementCriterion;
DROP TABLE IF EXISTS AchievementCriterion;
DROP TABLE IF EXISTS AchievementCriterionAchievement;
DROP TABLE IF EXISTS Collection;
DROP TABLE IF EXISTS Collection_Artifact;
DROP TABLE IF EXISTS Artifact;

CREATE TABLE Users(
    user_id int,
    name varchar(255),
    school varchar(255),
    class varchar(255),
    score INT,
    rank int,
    email varchar(255),
    phone character(10),
    PRIMARY KEY (user_id)
);

CREATE TABLE Account(
    user_id serial,
    username varchar(255),
    password varchar(255),
    type int,
    PRIMARY KEY (user_id)
);

CREATE TABLE SectionProgress(
    user_id int,
    sec_id char(10),
    status int,
    score int, 
    type int, 
    PRIMARY KEY (user_id,sec_id)
);

CREATE TABLE ActivityProgress(
    id char(10), 
    score int,
    done boolean,
    user_id int, 
    sec_id char(10),
    PRIMARY KEY (id)
); 

CREATE TABLE SectionStatus(
    user_id int,
    sec_id char(10), 
    status int,
    PRIMARY KEY (user_id,sec_id)
);

CREATE TABLE ActivityData(
    id char(10),
    type int, 
    header VARCHAR(255),
    is_required boolean,
    max_score FLOAT, 
    sec_id char(10),
    PRIMARY KEY (id)
);

CREATE TABLE SectionData(
    id char(10),
    name varchar(255),
    lesson_id char(10),
    PRIMARY KEY (id)
); 

CREATE TABLE Lesson(
    id char(10),
    name varchar(255), 
    chap_id char(10),
    PRIMARY KEY (id)
);

CREATE TABLE SectionLink(
    sec1_id char(10),
    sec2_id char(10),
    PRIMARY KEY (sec1_id, sec2_id)
);

CREATE TABLE Chapter(
    id char(10),
    name varchar(255), 
    part_id char(10),
    PRIMARY KEY (id)
);

CREATE TABLE Part(
    id char(10),
    name varchar(255), 
    grade_id char(10),
    PRIMARY KEY (id)
);

CREATE TABLE Grade(
    id char(10),
    name varchar(255), 
    PRIMARY KEY (id)
);

CREATE TABLE AcountAchievementCriterion(
    user_id char(10), 
    accrit_id char(10),
    count int, 
    PRIMARY KEY (user_id, accrit_id)
);

CREATE TABLE AchievementAccount(
    achv_id char(10),
    user_id char(10),
    date timestamp default NOW(),
    PRIMARY KEY (achv_id, user_id)
);

CREATE TABLE AchievementCriterion(
    id char(10),
    name varchar(100),
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE Achievement(
    id char(10),
    name varchar(255), 
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE AchievementCriterionAchievement(
    accrit_id char(10),
    achv_id char(10), 
    count int default 0, 
    PRIMARY KEY (accrit_id, achv_id)
);

CREATE TABLE Collection(
    id char(10),
    name varchar(255),
    description text,
    style varchar(255),
    user_id int,
    PRIMARY KEY (id)
);

CREATE TABLE CollectionArtifact(
    clt_id char(10),
    arti_id char(10),
    date timestamp default NOW(),
    PRIMARY KEY (clt_id, arti_id)
);

CREATE TABLE Artifact(
    id char(10),
    name varchar(255),
    description text, 
    PRIMARY KEY (id)
);