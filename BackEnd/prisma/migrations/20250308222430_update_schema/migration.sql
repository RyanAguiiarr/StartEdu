/*
  Warnings:

  - You are about to drop the column `imovelId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `interesse` table. All the data in the column will be lost.
  - You are about to drop the `chatparticipantes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `intereseId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_imovelId_fkey`;

-- DropForeignKey
ALTER TABLE `chatparticipantes` DROP FOREIGN KEY `ChatParticipantes_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `chatparticipantes` DROP FOREIGN KEY `ChatParticipantes_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `interesse` DROP FOREIGN KEY `Interesse_chatId_fkey`;

-- DropIndex
DROP INDEX `Chat_imovelId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Interesse_chatId_fkey` ON `interesse`;

-- AlterTable
ALTER TABLE `chat` DROP COLUMN `imovelId`,
    ADD COLUMN `intereseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `interesse` DROP COLUMN `chatId`;

-- DropTable
DROP TABLE `chatparticipantes`;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_intereseId_fkey` FOREIGN KEY (`intereseId`) REFERENCES `Interesse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
