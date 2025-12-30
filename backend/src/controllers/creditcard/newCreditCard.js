import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

function ajustarDia(ano, mes, dia) {
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  return Math.min(dia, ultimoDia);
}

function gerarInvoiceClosingDate(closingDay) {
  const hoje = new Date();
  let ano = hoje.getFullYear();
  let mes = hoje.getMonth();

  if (hoje.getDate() > closingDay) {
    mes += 1;
    if (mes > 11) {
      mes = 0;
      ano += 1;
    }
  }

  const diaFinal = ajustarDia(ano, mes, closingDay);
  return new Date(ano, mes, diaFinal, 12, 0, 0);
}

function gerarInvoiceDueDate(closingDate, dueDay) {
  let ano = closingDate.getFullYear();
  let mes = closingDate.getMonth();

  mes += 1;
  if (mes > 11) {
    mes = 0;
    ano += 1;
  }

  const diaFinal = ajustarDia(ano, mes, dueDay);
  return new Date(ano, mes, diaFinal, 12, 0, 0);
}

function gerarCVV() {
  return Math.floor(100 + Math.random() * 900).toString();
}

function gerarNumeroCartao() {
  let numero = "";

  for (let i = 0; i < 15; i++) {
    numero += Math.floor(Math.random() * 10);
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
  return numero + dv;
}

function gerarVencimentoCartao() {
  const hoje = new Date();
  return new Date(hoje.getFullYear() + 4, hoje.getMonth(), 1, 12, 0, 0);
}

router.post("/", async (req, res) => {
  const userId = req.userId;
  const { invoiceClosingDay } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  if (
    !Number.isInteger(invoiceClosingDay) ||
    invoiceClosingDay < 1 ||
    invoiceClosingDay > 28
  ) {
    return res.status(400).json({
      error: "Dia de fechamento inválido (use entre 1 e 28)",
    });
  }

  const invoiceDueDay = invoiceClosingDay + 10;

  try {
    const invoiceClosingDate = gerarInvoiceClosingDate(invoiceClosingDay);

    const invoiceDueDate = gerarInvoiceDueDate(
      invoiceClosingDate,
      invoiceDueDay
    );

    const card = await prisma.creditCard.create({
      data: {
        userId,
        number: gerarNumeroCartao(),
        cvv: gerarCVV(),
        expirationDate: gerarVencimentoCartao(),

        invoiceClosingDay,
        invoiceDueDay,

        invoiceClosingDate,
        invoiceDueDate,

        creditLimit: 600,
      },
    });

    return res.status(201).json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro ao criar cartão",
    });
  }
});

export default router;
