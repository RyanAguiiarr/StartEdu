import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const testConnection = async () => {
  try {
    await prisma.$connect()
    console.log("✅ Conexão com o banco de dados estabelecida!")
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error)
  }
}

export { prisma, testConnection }
