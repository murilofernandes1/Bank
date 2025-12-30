import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

function gerarInvoiceDueDate(dueDay) {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
  const diaFinal = Math.min(dueDay, ultimoDiaDoMes);

  return new Date(ano, mes, diaFinal, 12, 0, 0);
}

router.get("/", async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { creditCard: { include: { invoices: true } }, pixKeys: true },
      omit: { password: true },
    });

    res.json({
      ...user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possível carregar os dados do usuário" });
    console.log(error);
  }

  return;
});
export default router;
