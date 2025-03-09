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
  const { email, senha, nome } = req.body

  console.log("recebendo: ", req.body)

  try {
    // Verifica se o email já está cadastrado
    const usuario = await prisma.user_Aluno.findUnique({
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
    const novoUsuario = await prisma.user_Aluno.create({
      data: {
        nome: nome,
        email: email,
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

router.post("/login", async (req, res) => {
  const { email, senha } = req.body

  try {
    // Busca o usuário pelo email
    const usuario = await prisma.user_Aluno.findUnique({
      where: {
        email,
      },
    })

    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado" })
    }

    // Compara a senha informada com o hash do banco
    const senhaCorreta = await comparePassword(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(400).json({ message: "Senha inválida" })
    }

    // Gera um novo token
    const token = generateToken({ email })

    // Atualiza o token do usuário
    const usuarioAtualizado = await prisma.user_Aluno.update({
      where: {
        email,
      },
      data: {
        token,
      },
    })

    // Retorna a resposta com o usuário e o token
    res.status(200).json({
      message: "Usuário logado com sucesso",
      usuario: usuarioAtualizado,
      token,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: "Erro ao processar requisição", error: error.message })
  }
})

export default router
