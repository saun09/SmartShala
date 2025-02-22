-- AlterTable
ALTER TABLE `user` MODIFY `passwordHash` VARCHAR(191) NULL,
    MODIFY `educationBoard` ENUM('ICSE', 'CBSE', 'HSC', 'OTHER') NULL;
