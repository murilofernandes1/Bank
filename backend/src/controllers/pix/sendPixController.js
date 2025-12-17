import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const userId = req.userId;

    const { destinationId, amount } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const destinationUser = await prisma.user.findUnique({
      where: {
        id: destinationId,
      },
    });
    if (!destinationUser) {
      return res
        .status(404)
        .json({ message: "Destinatário não foi encontrado ou não existe." });
    }

    if (user.balance < amount) {
      return res
        .status(403)
        .json({ message: "Saldo insuficiente para esta transferência" });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: { decrement: amount },
      },
    });

    await prisma.user.update({
      where: {
        id: destinationId,
      },
      data: {
        balance: { increment: amount },
      },
    });

    const newTransaction = await prisma.transaction.create({
      data: {
        userId: userId,
        destinationId: destinationId,
        amount: amount,
      },
    });
    return res
      .status(200)
      .json({ message: "Transferência realizada com sucesso!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro na transferência", error });
  }
});
export default router;
