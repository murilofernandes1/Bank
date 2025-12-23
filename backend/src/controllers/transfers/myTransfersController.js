import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autorizado." });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ userId: userId }, { destinationId: userId }],
      },
      orderBy: {
        date: "desc",
      },
      include: {
        user: { select: { name: true } },
        destinationUser: { select: { name: true } },
      },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possível carregar as transferências." });
    console.log(error);
    return;
  }
});
export default router;
