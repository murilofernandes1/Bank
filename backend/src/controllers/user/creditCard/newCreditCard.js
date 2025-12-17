import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

function gerarVencimentoCartao() {
  const hoje = new Date();
  const anos = Math.floor(Math.random() * 3) + 3;
  const mes = Math.floor(Math.random() * 12);

  return new Date(hoje.getFullYear() + anos, mes, 1, 12, 0, 0);
}

function gerarCVV() {
  return Math.floor(100 + Math.random() * 900).toString();
}

function gerarNumeroCartao() {
  let numero = Math.floor(100000 + Math.random() * 900000).toString();

  while (numero.length < 15) {
    numero += Math.floor(Math.random() * 10).toString();
  }

  const digits = numero.split("").map(Number).reverse();
  let soma = 0;

  for (let i = 0; i < digits.length; i++) {
    let n = digits[i];
    if (i % 2 === 0) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    soma += n;
  }

  const dv = (10 - (soma % 10)) % 10;
  return numero + dv.toString();
}

function gerarInvoiceDueDate(dueDay) {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
  const diaFinal = Math.min(dueDay, ultimoDiaDoMes);

  return new Date(ano, mes, diaFinal, 12, 0, 0);
}

router.post("/", async (req, res) => {
  const userId = req.userId;
  const dueDay = Number(req.body.dueDay);

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (!Number.isInteger(dueDay) || dueDay < 1 || dueDay > 31) {
    return res.status(400).json({ error: "dueDay inválido" });
  }

  try {
    const card = await prisma.creditCard.create({
      data: {
        userId,
        number: gerarNumeroCartao(),
        cvv: gerarCVV(),
        expirationDate: gerarVencimentoCartao(),
        invoiceDueDay: dueDay,
      },
    });

    const invoiceDueDate = gerarInvoiceDueDate(dueDay);

    return res.status(201).json({
      ...card,
      invoiceDueDate,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar cartão" });
    console.log(error);
  }
});

export default router;
