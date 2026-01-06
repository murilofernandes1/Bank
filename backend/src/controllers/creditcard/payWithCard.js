import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    const { amount, destinationId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valor inválido." });
    }

    const card = await prisma.creditCard.findUnique({
      where: { userId },
      include: { invoices: true },
    });

    if (!card) {
      return res
        .status(404)
        .json({ message: "O usuário ainda não tem um cartão de crédito." });
    }

    if (card.creditLimit < amount || card.currentLimit < amount) {
      return res.status(403).json({ message: "Limite insuficiente." });
    }

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    let invoice = await prisma.invoice.findFirst({
      where: {
        creditCardId: card.id,
        isPaid: false,
        AND: [
          { referenceDate: { gte: new Date(year, month, 1) } },
          { referenceDate: { lt: new Date(year, month + 1, 1) } },
        ],
      },
    });

    if (!invoice) {
      invoice = await prisma.invoice.create({
        data: {
          creditCardId: card.id,
          referenceDate: new Date(year, month, 1),
          totalAmount: amount,
        },
      });
    } else {
      invoice = await prisma.invoice.update({
        where: { id: invoice.id },
        data: { totalAmount: { increment: amount } },
      });
    }

    const destinationUser = await prisma.user.update({
      where: { id: destinationId },
      data: { balance: { increment: amount } },
    });

    if (!destinationUser) {
      return res.status(404).json({ message: "Destinatário não encontrado." });
    }

    await prisma.transaction.create({
      data: {
        userId,
        destinationId,
        amount,
        method: "CARD",
      },
    });

    await prisma.creditCard.update({
      where: { id: card.id },
      data: { currentLimit: { decrement: amount } },
    });

    return res.status(200).json({ message: "Transação feita com sucesso." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Um erro aconteceu." });
  }
});

export default router;
