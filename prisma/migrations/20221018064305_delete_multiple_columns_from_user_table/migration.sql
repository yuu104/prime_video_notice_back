/*
  Warnings:

  - You are about to drop the column `icon_image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `icon_image`,
    DROP COLUMN `name`;
