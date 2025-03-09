import express from "express"
import { prisma } from "../database.js" // Conexão com Prisma

const router = express.Router()

// rota de login
router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const alunos_de_imovel = await prisma.alunoTurma.findMany({
      where: {
        turmaId: id,
      },
    })

    if (!alunos_de_imovel) {
      return res
        .status(404)
        .json({ message: "Imóvel não tem alunos vinculado" })
    }

    // com o id dos alunos buscar o nome deles
    let nome_alunos = []
    for (let i = 0; i < alunos_de_imovel.length; i++) {
      const aluno = await prisma.aluno.findUnique({
        where: {
          id: alunos_de_imovel[i].alunoId,
        },
      })

      alunos_de_imovel[i].nome = aluno.nome
      nome_alunos.push(aluno.nome)
    }

    return res
      .status(200)
      .json({ message: "alunos vinculados ao imovel: ", nome_alunos })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: "Erro ao processar requisição", error: error.message })
  }
})

export default router
