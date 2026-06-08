import * as QuadraModel from "../models/quadraModel.js";

export async function listarQuadras(req, res) {
  try {
    const quadras = await QuadraModel.listar();
    res.json(quadras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar quadras" });
  }
}

export async function obterQuadra(req, res) {
  const idNumero = Number(req.params.id);
  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }
  try {
    const quadra = await QuadraModel.buscarPorId(idNumero);
    if (!quadra) {
      return res.status(404).json({ erro: "Quadra não encontrada" });
    }
    res.json(quadra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar quadra" });
  }
}

export async function criarQuadra(req, res) {
  const { nome, tipo, valorHora } = req.body;
  if (typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }
  if (typeof tipo !== "string" || tipo.trim() === "") {
    return res.status(400).json({ erro: "Tipo é obrigatório" });
  }
  if (typeof valorHora !== "number" || !Number.isFinite(valorHora)) {
    return res.status(400).json({ erro: "valorHora deve ser um número válido" });
  }
  try {
    const quadraCriada = await QuadraModel.criar({ nome, tipo, valorHora });
    res.status(201).json({ mensagem: "Quadra criada com sucesso!", quadra: quadraCriada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar quadra" });
  }
}

export async function atualizarQuadra(req, res) {
  const idNumero = Number(req.params.id);
  const { nome, tipo, valorHora } = req.body;
  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }
  const campos = {};
  if (nome !== undefined) {
    if (typeof nome !== "string" || nome.trim() === "") {
      return res.status(400).json({ erro: "Nome inválido" });
    }
    campos.nome = nome.trim();
  }
  if (tipo !== undefined) {
    if (typeof tipo !== "string" || tipo.trim() === "") {
      return res.status(400).json({ erro: "Tipo inválido" });
    }
    campos.tipo = tipo.trim();
  }
  if (valorHora !== undefined) {
    if (typeof valorHora !== "number" || !Number.isFinite(valorHora)) {
      return res.status(400).json({ erro: "valorHora deve ser um número válido" });
    }
    campos.valorHora = Number(valorHora);
  }
  try {
    const quadraAtualizada = await QuadraModel.atualizar(idNumero, campos);
    if (!quadraAtualizada) {
      return res.status(404).json({ erro: "Quadra não encontrada" });
    }
    res.json({ mensagem: "Quadra atualizada com sucesso!", quadra: quadraAtualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar quadra" });
  }
}

export async function excluirQuadra(req, res) {
  const idNumero = Number(req.params.id);
  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }
  try {
    const quadraRemovida = await QuadraModel.excluir(idNumero);
    if (!quadraRemovida) {
      return res.status(404).json({ erro: "Quadra não encontrada" });
    }
    res.json({ mensagem: "Quadra excluída com sucesso!", quadra: quadraRemovida });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao excluir quadra" });
  }
}
