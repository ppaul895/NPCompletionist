DROP DATABASE IF EXISTS npc_prod;
CREATE DATABASE npc_prod;
USE npc_prod;

CREATE TABLE `app_user` (
    `app_user_id` int PRIMARY KEY AUTO_INCREMENT,
    `username` varchar(50) NOT NULL UNIQUE,
    `password_hash` varchar(255) NOT NULL,
    `disabled` bit NOT NULL DEFAULT 0
);

CREATE TABLE `app_role` (
    `app_role_id` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(50) NOT NULL UNIQUE
);

CREATE TABLE `app_user_role` (
    `app_user_id` int NOT NULL,
    `app_role_id` int NOT NULL,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

CREATE TABLE `backlog` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `app_user_id` int NOT NULL,
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
ALTER TABLE `backlog` ADD FOREIGN KEY (`app_user_id`) REFERENCES `app_user` (`app_user_id`);
ALTER TABLE `media` ADD FOREIGN KEY (`id`) REFERENCES `game` (`media_id`);
ALTER TABLE `game_platform` ADD FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);
ALTER TABLE `game_platform` ADD FOREIGN KEY (`platform_id`) REFERENCES `platform` (`id`);

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