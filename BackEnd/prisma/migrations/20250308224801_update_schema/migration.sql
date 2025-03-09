-- CreateTable
CREATE TABLE `User_Aluno` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Aluno_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Imobiliaria` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Imobiliaria_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
