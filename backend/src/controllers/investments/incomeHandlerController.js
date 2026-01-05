import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.put("/:id/income", async (req, res) => {
  const userId = req.userId;
  const investmentId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const investment = await prisma.investment.findFirst({
      where: {
        id: investmentId,
        userId: userId,
      },
    });

    if (!investment) {
      return res.status(404).json({ message: "Investimento não encontrado." });
    }

    const now = new Date();
    const last = investment.lastIncomeAt;

    const diffDays = Math.floor(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) {
      return res.status(200).json({
        message: "Rendimento já aplicado hoje.",
        totalIncome: investment.totalIncome,
      });
    }

    const income =
      investment.amountInvested * investment.incomeGenerated * diffDays;

    const updated = await prisma.investment.update({
      where: { id: investment.id },
      data: {
        totalIncome: {
          increment: Math.floor(income),
        },
        lastIncomeAt: now,
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno." });
  }
});
