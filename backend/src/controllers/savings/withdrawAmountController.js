import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.put("/:id/withdraw", async (req, res) => {
  const userId = req.userId;
  const savingId = req.params.id;
  const { amount } = req.body;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autorizado." });
  }
  try {
    const saving = await prisma.saving.findUnique({
      where: { id: savingId },
    });
    if (!saving) {
      return res.status(404).json({ message: "Porquinho não encontrado." });
    }
    if (saving.currentAmount < amount) {
      return res.status(401).json({
        message: "Valor guardado no porquinho é menor que a quantia resgatada.",
      });
    }
    await prisma.saving.update({
      where: {
        id: saving.id,
      },
      data: {
        currentAmount: { decrement: amount },
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: { increment: amount },
      },
    });
    return res
      .status(200)
      .json({ message: "Valor resgatado do porquinho com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possivel resgatar o valor do porquinho." });
    console.log(error);
  }
});
export default router;
