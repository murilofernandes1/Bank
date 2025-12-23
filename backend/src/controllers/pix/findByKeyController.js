import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const { key } = req.query;

    const findKey = await prisma.pixKey.findFirst({
      where: {
        key: String(key),
      },
      select: {
        id: true,
        key: true,
        type: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!findKey) {
      return res.status(404).json({ message: "Chave não encontrado." });
    }
    if (findKey.user.id === userId) {
      return res.status(403).json({
        message: "Você não pode realizar transferências pra si mesmo.",
      });
    }

    res.json(findKey);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    return;
  }
});
export default router;
