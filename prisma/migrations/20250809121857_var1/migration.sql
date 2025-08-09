-- AlterTable
ALTER TABLE `product` ADD COLUMN `tag` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productList` JSON NULL,
    `productIds` VARCHAR(191) NOT NULL,
    `orderDate` DATE NOT NULL,
    `userId` INTEGER NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `userPhone` VARCHAR(191) NOT NULL,
    `orderAmt` INTEGER NOT NULL,
    `tax` INTEGER NOT NULL,
    `invoiceJson` JSON NULL,
    `invoicePath` VARCHAR(191) NOT NULL,
    `orderTotal` INTEGER NOT NULL,
    `paymentStatus` BOOLEAN NOT NULL,
    `orderStatus` VARCHAR(191) NOT NULL,
    `paymentDate` DATE NOT NULL,
    `transectionId` VARCHAR(191) NOT NULL,
    `remakrs` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userproduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `cred` VARCHAR(191) NOT NULL,
    `startDt` DATE NOT NULL,
    `endDt` DATE NOT NULL,
    `remakrs` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
