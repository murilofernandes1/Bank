import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/investments/:planId/apply", async (req, res) => {
  const userId = req.userId;
  const { planId } = req.params;
  const { amount } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valor inválido." });
  }

  try {
    // 🔍 Busca usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Saldo insuficiente." });
    }

    const plan = await prisma.investmentPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.active) {
      return res.status(404).json({ message: "Investimento indisponível." });
    }

    const userInvestment = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      return tx.userInvestment.create({
        data: {
          userId,
          planId,
          amountInvested: amount,
          dailyRate: plan.dailyRate,
        },
      });
    });

    return res.status(201).json({
      message: "Investimento aplicado com sucesso.",
      investment: userInvestment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno." });
  }
});
