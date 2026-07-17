CREATE TABLE `wedding_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(255) NOT NULL,
	`fileUrl` text NOT NULL,
	`fileType` varchar(50) NOT NULL,
	`mimeType` varchar(100),
	`fileSizeBytes` int,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wedding_files_id` PRIMARY KEY(`id`),
	CONSTRAINT `wedding_files_fileKey_unique` UNIQUE(`fileKey`)
);
