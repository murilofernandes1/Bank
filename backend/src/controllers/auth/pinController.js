import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    const userInfo = req.body;

    console.log(userInfo.pin);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(String(userInfo.pin).trim(), user.pin);

    if (!isMatch) {
      return res.status(401).json({ message: "Pin inválido" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json(token);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Algo deu errado, tente novamente", error: error });
    console.log(error);
  }
});

export default router;
