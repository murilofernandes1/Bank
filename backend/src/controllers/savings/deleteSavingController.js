import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.delete("/:id", async (req, res) => {
  const userId = req.userId;
  const savingId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }
  try {
    const saving = await prisma.saving.findUnique({
      where: {
        id: savingId,
      },
    });
    if (!saving) {
      return res.status(404).json({ message: "Reserva não encontrada." });
    }
    if (saving.currentAmount > 0) {
      return res.status(401).json({ message: "A Reserva não está vazia." });
    }
    await prisma.saving.delete({
      where: {
        id: savingId,
      },
    });
    return res.status(200).json({ message: "Reserva deletada com sucesso." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Um erro aconteceu", error });
    return;
  }
});
export default router;
