/*
  Warnings:

  - You are about to drop the column `cursoId` on the `aluno` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `aluno` DROP FOREIGN KEY `Aluno_cursoId_fkey`;

-- DropIndex
DROP INDEX `Aluno_cursoId_fkey` ON `aluno`;

-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `cursoId`;

-- CreateTable
CREATE TABLE `_AlunoToCurso` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AlunoToCurso_AB_unique`(`A`, `B`),
    INDEX `_AlunoToCurso_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AlunoToCurso` ADD CONSTRAINT `_AlunoToCurso_A_fkey` FOREIGN KEY (`A`) REFERENCES `Aluno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlunoToCurso` ADD CONSTRAINT `_AlunoToCurso_B_fkey` FOREIGN KEY (`B`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
