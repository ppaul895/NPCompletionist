DROP DATABASE IF EXISTS npc_test;
CREATE DATABASE npc_test;
USE npc_test;

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `backlog` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `isCompleted` boolean NOT NULL,
  `datetime_added` timestamp NOT NULL
);

CREATE TABLE `game` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_date` date NOT NULL,
  `developer` varchar(255) NOT NULL,
  `score` int NOT NULL,
  `media_id` int NOT NULL UNIQUE,
  `genre` varchar(255) NOT NULL
);

CREATE TABLE `media` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `image_url` varchar(255),
  `trailer_url` varchar(255)
);

CREATE TABLE `platform` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL UNIQUE
);

CREATE TABLE `game_platform` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `platform_id` int NOT NULL
);

ALTER TABLE `backlog` ADD FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);
ALTER TABLE `backlog` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `media` ADD FOREIGN KEY (`id`) REFERENCES `game` (`media_id`);
ALTER TABLE `game_platform` ADD FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);
ALTER TABLE `game_platform` ADD FOREIGN KEY (`platform_id`) REFERENCES `platform` (`id`);

delimiter //
create procedure set_known_good_state()
begin
    delete from backlog;
    alter table backlog auto_increment = 1;
    delete from `user`;
    alter table `user` auto_increment = 1;
    delete from game_platform;
    alter table game_platform auto_increment = 1;
    delete from platform;
    alter table platform auto_increment = 1;
    delete from media;
    alter table media auto_increment = 1;
    delete from game;
    alter table game auto_increment = 1;
    
    insert into platform 
        (`name`) 
    values
        ('Xbox Series X/S'),
        ('PlayStation 5'),
        ('Nintendo Switch'),
        ('PC'),
        ('Google Stadia'),
        ('Xbox One'),
        ('PlayStation 4'),
        ('Oculus Rift'),
        ('PlayStation VR'),
        ('HTC Vive'),
        ('Wii U'),
        ('Nintendo 3DS'),
        ('PlayStation Vita');

    insert into `user` 
        (username, `password`) 
    values
        ('tester1','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa'),
        ('tester2','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa'),
        ('tester3','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa'),
        ('tester4','$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa');

    insert into game
        (title, release_date, developer, score, media_id, genre)
    values
        ('Elden Ring','2022-02-25','FromSoftware Inc.',95,1,'Action'),
        ('Stray','2022-07-19','BlueTwelve Studios',84,2,'Adventure'),
        ('Halo Infinite','2021-12-08','343 Industries',87,3,'Action'),
        ('Cult of the Lamb','2022-08-11','Massive Monster',85,4,'Action');

    insert into media
        (image_url, trailer_url)
    values
        ('https://img.opencritic.com/game/12090/o/5BXKr5S1.jpg','https://youtube.com/watch?v=UhD0_MM4fnU'),
        ('https://img.opencritic.com/game/13386/o/S3tnyfm8.jpg','https://www.youtube.com/watch?v=fOm_9N9ksBY'),
        ('https://img.opencritic.com/game/12088/o/AcyojAVM.jpg','https://youtube.com/watch?v=PyMlV5_HRWk');

    insert into backlog
        (user_id, game_id, isCompleted, datetime_added)
    values
        (1, 1, false, '2022-08-22T11:36:07.230077600'),
        (1, 2, false, '2022-08-22T11:42:34.823904100'),
        (1, 3, false, '2022-08-22T11:51:12.452391700'),
        (1, 4, false, '2022-08-22T11:58:45.245624500');

    insert into game_platform
        (game_id, platform_id)
    values
        (1, 4),
        (1, 1),
        (1, 2),
        (1, 6),
        (1, 7),
        (2, 2),
        (2, 7),
        (2, 4),
        (3, 6),
        (3, 1),
        (4, 4),
        (4, 2),
        (4, 1),
        (4, 7),
        (4, 6);
end //
delimiter ;