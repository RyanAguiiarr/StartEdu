import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../src/services/autenticacao.js" // Função de hash de senha, se necessário

const prisma = new PrismaClient()

async function main() {
  // Cria um Campus
  const campus = await prisma.campus.create({
    data: {
      nome: "Campus Central",
      endereco: "Rua Principal, 123",
      numero: 100,
      email: "contato@campuscentral.com",
      telefone: "123456789",
    },
  })

  // Cria um Curso
  const curso = await prisma.curso.create({
    data: {
      nome: "Engenharia de Software",
      duracao: "5 anos",
      periodos: "1º, 2º, 3º, 4º, 5º",
      campusId: campus.id,
    },
  })

  // Cria um Aluno
  const aluno = await prisma.aluno.create({
    data: {
      nome: "João Silva",
      cpf: "12345678901",
      email: "joao.silva@example.com",
      senha: await hashPassword("123456"), // Exemplo de senha hash
      token: "fakeTokenForNow",
      telefone: "987654321",
      dataNascimento: new Date("2000-01-01"),
      sexo: "M",
      cursoId: curso.id,
    },
  })

  // Cria uma Turma
  const turma = await prisma.turma.create({
    data: {
      periodo: "2025-1",
      campusId: campus.id,
    },
  })

  // Cria a relação entre Aluno e Turma
  await prisma.alunoTurma.create({
    data: {
      alunoId: aluno.id,
      turmaId: turma.id,
      dataMatricula: new Date(),
    },
  })

  // Cria um Imobiliária
  const imobiliaria = await prisma.imobiliaria.create({
    data: {
      nome: "Imobiliária XYZ",
      endereco: "Avenida Comercial, 456",
      numero: 200,
      email: "contato@imobiliariaxyz.com",
      telefone: "1122334455",
    },
  })

  // Cria um Imóvel
  const imovel = await prisma.imovel.create({
    data: {
      nome: "Apartamento A",
      endereco: "Rua dos Imóveis, 789",
      numero: 101,
      numQuartos: 3,
      numBanheiros: 2,
      mobiliado: true,
      status: true,
      imobiliariaId: imobiliaria.id,
    },
  })

  // Cria um Interesse
  const interesse = await prisma.interesse.create({
    data: {
      alunoId: aluno.id,
      imovelId: imovel.id,
      chatId: null,
      mensagem: "Tenho interesse nesse apartamento.",
      dataInteresse: new Date(),
      status: "Em análise",
    },
  })

  console.log("Banco de dados populado com dados de exemplo!")
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
