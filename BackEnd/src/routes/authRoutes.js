import express from "express"
import { prisma } from "../database.js" // Conexão com Prisma

const router = express.Router()

// rota de cadastro
router.post("/", async (req, res) => {
  const { email, cpf, dataNasci, telefone, sexo, cursoId, nome } = req.body

  console.log("recebendo: ", req.body)

  try {
    // Verifica se o email já está cadastrado
    const usuario = await prisma.aluno.findUnique({
      where: {
        email,
      },
    })

    if (usuario) {
      return res.status(400).json({ message: "Email já cadastrado" })
    }
    // Cria um novo usuário
    const novoUsuario = await prisma.aluno.create({
      data: {
        nome: nome,
        email: email,
        dataNascimento: dataNasci,
        telefone: telefone,
        sexo: sexo,
        cursoId: cursoId,
        cpf: cpf,
      },
    })

    // Retorna a resposta com o novo usuário
    res.status(201).json({
      message: "Usuário criado com sucesso",
      usuario: novoUsuario,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: "Erro ao processar requisição", error: error.message })
  }
})

export default router
