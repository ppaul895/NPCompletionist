DROP DATABASE IF EXISTS npc_prod;
CREATE DATABASE npc_prod;
USE npc_prod;

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
  `image_url` varchar(255) NOT NULL,
  `trailer_url` varchar(255) NOT NULL
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