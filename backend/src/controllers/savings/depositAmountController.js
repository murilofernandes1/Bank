import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.put("/:id/deposit", async (req, res) => {
  const userId = req.userId;
  const savingId = req.params.id;
  const { amount } = req.body;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autorizado." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user.balance < amount) {
      return res.status(401).json({ message: "Saldo insuficiente." });
    }
    const saving = await prisma.saving.findUnique({
      where: { id: savingId },
    });
    if (!saving) {
      return res.status(404).json({ message: "Porquinho não encontrado." });
    }
    await prisma.saving.update({
      where: {
        id: saving.id,
      },
      data: {
        currentAmount: { increment: amount },
      },
    });
    return res
      .status(200)
      .json({ message: "Valor guardado no porquinho com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possivel guardar o valor no porquinho." });
    console.log(error);
  }
});
export default router;
