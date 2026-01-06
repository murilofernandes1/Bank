import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.put("/", async (req, res) => {
  const userId = req.userId;
  const { amount } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autorizado" });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valor inválido" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { creditCard: true },
    });

    if (!user?.creditCard) {
      return res.status(404).json({
        message: "O usuário ainda não tem um cartão de crédito.",
      });
    }

    const invoice = await prisma.invoice.findFirst({
      where: {
        creditCardId: user.creditCard.id,
        isPaid: false,
      },
      orderBy: {
        referenceDate: "asc",
      },
    });

    if (!invoice) {
      return res.status(404).json({
        message: "Nenhuma fatura em aberto encontrada",
      });
    }

    if (amount > invoice.totalAmount) {
      return res.status(400).json({
        message: "O valor do pagamento é maior que o saldo da fatura",
      });
    }

    const isFullPayment = amount === invoice.totalAmount;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        totalAmount: { decrement: amount },
        paidAmount: { increment: amount },
        isPaid: isFullPayment ? true : false,
      },
    });

    await prisma.creditCard.update({
      where: {
        id: user.creditCard.id,
      },
      data: {
        currentLimit: { increment: amount },
      },
    });

    return res.status(200).json({
      message: isFullPayment
        ? "Fatura paga com sucesso"
        : "Pagamento parcial realizado com sucesso",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Não foi possível pagar a fatura" });
  }
});

export default router;
