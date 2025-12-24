import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Usuário não autorizado." });
  }
  try {
    const savings = await prisma.saving.findMany({
      where: { userId: userId },
    });
    res.status(200).json(savings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possivel consultar seus porquinhos." }, error);
    console.log(error);
    return;
  }
});
export default router;
