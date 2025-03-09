import jwt from "jsonwebtoken"
import { prisma } from "../database.js"

const authenticate = async (req, res, next) => {
  // Verifica se o token está presente no cabeçalho Authorization
  const token = req.headers["authorization"]?.split(" ")[1] // Ex: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" })
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verifique se a chave secreta é a mesma que você usou ao gerar o token

    // Verifica se o token está no banco de dados
    const usuario = await prisma.user_Aluno.findUnique({
      where: decoded.email, // O email está no payload do token
    })

    if (!usuario || usuario.token !== token) {
      return res.status(401).json({ message: "Token inválido ou expirado" })
    }

    // Passa as informações do usuário para a requisição
    req.user = usuario

    next() // Chama a próxima função ou rota
  } catch (error) {
    return res.status(401).json({ message: "Erro ao verificar o token" })
  }
}

export default authenticate
