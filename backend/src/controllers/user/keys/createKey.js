import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { key, type } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    await prisma.pixKey.create({
      data: {
        userId,
        key: key,
        type: type,
      },
    });
    res.status(201).json({ message: `Chave criada com sucesso` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Não foi possivel criar a chave" });
  }
});

export default router;
