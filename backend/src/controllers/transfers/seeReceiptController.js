import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  const userId = req.userId;
  const transactionId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autorizado." });
  }
  try {
    const receipt = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        user: { select: { name: true } },
        destinationUser: { select: { name: true } },
      },
    });
    return res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Não foi possível carregar o recibo." });
    console.log(error);
    return;
  }
});
export default router;
