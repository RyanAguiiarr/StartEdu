import express from "express"
import { prisma } from "../database.js" // Conexão com Prisma
import {
  generateToken,
  hashPassword,
  comparePassword,
} from "../services/autenticacao.js"

const router = express.Router()

// rota de cadastro
router.post("/", async (req, res) => {
  const { email, senha, cpf, dataNasci, telefone, sexo, cursoId, nome } =
    req.body

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

    // Gera um hash da senha
    const senhaHash = await hashPassword(senha)
    console.log("senhaHash: ", senhaHash)

    // gerar token
    const token = generateToken({ email })

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
        token: token,
        senha: senhaHash,
      },
    })

    // Retorna a resposta com o novo usuário
    res.status(201).json({
      message: "Usuário criado com sucesso",
      usuario: novoUsuario,
      token,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: "Erro ao processar requisição", error: error.message })
  }
})

// rota de login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body

  console.log("recebendo: ", req.body)

  try {
    const dadosAluno = await prisma.aluno.findUnique({
      where: {
        email,
      },
    })

    if (!dadosAluno) {
      return res.status(400).json({ message: "Email não encontrado!" })
    }

    // Compara a senha digitada com a salva no banco
    const isMatch = await comparePassword(senha, dadosAluno.senha)
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta!" })
    }

    res.json({
      message: "usuario logado com sucesso",
      user: {
        id: dadosAluno.id,
        name: dadosAluno.nome,
        email: dadosAluno.email,
      },
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: "Erro ao processar requisição", error: error.message })
  }
})

export default router
