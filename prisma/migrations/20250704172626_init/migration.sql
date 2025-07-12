-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userrole` VARCHAR(191) NOT NULL DEFAULT 'guest',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `metadata` VARCHAR(191) NOT NULL,
    `html` VARCHAR(191) NOT NULL,
    `active` VARCHAR(191) NOT NULL,
    `js` VARCHAR(191) NOT NULL,
    `css` VARCHAR(191) NOT NULL,
    `authors` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `vendor` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `tax` INTEGER NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `discout` INTEGER NOT NULL,
    `avlcount` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `assets` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `manual` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
