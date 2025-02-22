/*
  Warnings:

  - Made the column `passwordHash` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `passwordHash` VARCHAR(191) NOT NULL,
    MODIFY `schoolYear` INTEGER NULL;
