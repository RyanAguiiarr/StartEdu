/*
  Warnings:

  - You are about to drop the `_alunotocurso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_alunotocurso` DROP FOREIGN KEY `_AlunoToCurso_A_fkey`;

-- DropForeignKey
ALTER TABLE `_alunotocurso` DROP FOREIGN KEY `_AlunoToCurso_B_fkey`;

-- AlterTable
ALTER TABLE `aluno` ADD COLUMN `cursoId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_alunotocurso`;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
