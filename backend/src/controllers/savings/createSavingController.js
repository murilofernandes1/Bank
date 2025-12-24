import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const userId = req.userId;
  const { goalName, targetAmount } = req.body;
  if (!userId) {
    res.status(401).json({ message: "Usuário não autorizado." });
  }
  try {
    await prisma.saving.create({
      data: {
        userId: userId,
        goalName: goalName,
        targetAmount: targetAmount,
      },
    });
    return res.status(201).json({ message: "Porquinho criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel criar o porquinho" });
    console.log(error);
  }
});
export default router;
