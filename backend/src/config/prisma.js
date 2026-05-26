import "dotenv/config";

import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Teste de conexão
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("[Prisma] Conexão com o banco de dados bem-sucedida!");
  } catch (error) {
    console.error("[Prisma] Erro ao conectar no banco de dados:", error);
  }
}

// Execute o teste de conexão ao importar
testConnection();

export { prisma };