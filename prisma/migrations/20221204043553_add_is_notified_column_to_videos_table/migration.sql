/*
  Warnings:

  - Added the required column `is_notified` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `videos` ADD COLUMN `is_notified` BOOLEAN NOT NULL;
