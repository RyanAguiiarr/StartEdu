/*
  Warnings:

  - You are about to drop the column `senha` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `senha`,
    DROP COLUMN `token`;
