import express from "express"
import { testConnection } from "./src/database.js" // Importando a função
import authRoutes from "./src/routes/authRoutes.js" // Importando as rotas
import imoveisRoutes from "./src/routes/imoveisRoutes.js" // Importando as rotas
import authenticate from "./src/middlewares/auth_Token.js" // Importando a função

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// rotas
app.use("/cadastro", authRoutes)
app.use("/lista", authenticate, imoveisRoutes)

app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  await testConnection() // Testa a conexão ao iniciar o servidor
})
