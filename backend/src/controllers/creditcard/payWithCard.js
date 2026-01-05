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

    const card = await prisma.creditCard.findUnique({
      where: {
        userId: userId,
      },
      include: { invoices: true },
    });

    if (!card) {
      return res
        .status(404)
        .json({ message: "O usuário ainda não tem um cartão de crédito." });
    }
    if (card.creditLimit < amount) {
      return res.status(403).json({ message: "Limite insuficiente." });
    }
    if (card.currentLimit < amount) {
      return res.status(403).json({ message: "Limite insuficiente." });
    }
    const now = new Date();

    const referenceDate = new Date(now.getFullYear(), now.getMonth(), 1);

    const invoice = await prisma.invoice.findFirst({
      where: {
        creditCardId: card.id,
        referenceDate: referenceDate,
        isPaid: false,
      },
    });
    if (!invoice) {
      await prisma.invoice.create({
        data: {
          creditCardId: card.id,
          referenceDate: referenceDate,
          totalAmount: amount,
        },
      });
    } else {
      await prisma.invoice.update({
        where: {
          id: invoice.id,
        },
        data: {
          totalAmount: { increment: amount },
        },
      });
    }
    const destinationUser = await prisma.user.update({
      where: {
        id: destinationId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    if (!destinationUser) {
      return res.status(404).json({ message: "Destinatário não encontrado." });
    }
    await prisma.transaction.create({
      data: {
        userId: userId,
        destinationId: destinationId,
        amount: amount,
        method: "CARD",
      },
    });
    await prisma.creditCard.update({
      where: {
        id: card.id,
      },
      data: {
        currentLimit: {
          decrement: amount,
        },
      },
    });
    return res.status(200).json({ message: "Transação feita com sucesso." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Um erro aconteceu." });
    return;
  }
});
export default router;
