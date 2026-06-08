import { prisma } from "../config/prisma.js";

// CRUD usando Prisma Client para a entidade Quadra

export async function listar() {
  try {
    return await prisma.quadra.findMany();
  } catch (error) {
    console.error("Erro ao listar quadras:", error);
    throw error;
  }
}

export async function buscarPorId(id) {
  try {
    return await prisma.quadra.findUnique({ where: { id: Number(id) } });
  } catch (error) {
    if (error.code === "P2025") return null;
    console.error("Erro ao buscar quadra por ID:", error);
    throw error;
  }
}

export async function criar({ nome, tipo, valorHora }) {
  try {
    return await prisma.quadra.create({
      data: {
        nome: nome.trim(),
        tipo: tipo.trim(),
        valorHora: Number(valorHora)
      }
    });
  } catch (error) {
    console.error("Erro ao criar quadra:", error);
    throw error;
  }
}

export async function atualizar(id, campos) {
  try {
    return await prisma.quadra.update({
      where: { id: Number(id) },
      data: campos
    });
  } catch (error) {
    if (error.code === "P2025") return null;
    console.error("Erro ao atualizar quadra:", error);
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.quadra.delete({ where: { id: Number(id) } });
  } catch (error) {
    if (error.code === "P2025") return null;
    console.error("Erro ao excluir quadra:", error);
    throw error;
  }
}
