import { prisma } from "../config/prisma.js";

// CRUD usando Prisma Client para a entidade Task

export async function listar() {
  try {
    return await prisma.task.findMany();
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    throw error;
  }
}

export async function buscarPorId(id) {
  try {
    return await prisma.task.findUnique({ where: { id: Number(id) } });
  } catch (error) {
    if (error.code === "P2025") return null;
    console.error("Erro ao buscar tarefa por ID:", error);
    throw error;
  }
}

export async function criar({ title, description }) {
  try {
    return await prisma.task.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : undefined
      }
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}

export async function atualizar(id, campos) {
  try {
    return await prisma.task.update({
      where: { id: Number(id) },
      data: campos
    });
  } catch (error) {
    if (error.code === "P2025") return null;
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.task.delete({ where: { id: Number(id) } });
  } catch (error) {
    if (error.code === "P2025") return null;
    console.error("Erro ao excluir tarefa:", error);
    throw error;
  }
}
