import express from "express";
import * as QuadraController from "../controllers/quadraController.js";

const router = express.Router();

router.get("/", QuadraController.listarQuadras);
router.get("/:id", QuadraController.obterQuadra);
router.post("/", QuadraController.criarQuadra);
router.put("/:id", QuadraController.atualizarQuadra);
router.delete("/:id", QuadraController.excluirQuadra);

export default router;
