import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
router.post("/", async (req, res) => {
  try {
    const { name, email, password, cpf, pin } = req.body;
    const hashPassword = await bcrypt.hash(String(password), 10);

    const hashPin = await bcrypt.hash(String(pin).trim(), 10);

    const userDB = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        cpf,
        pin: hashPin,
      },
    });

    const token = jwt.sign({ id: userDB.id }, JWT_SECRET, { expiresIn: "1y" });

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});
export default router;
