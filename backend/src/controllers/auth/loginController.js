import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const userInfo = req.body;

    //busca usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    // verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    //comparando as senhas
    const isMatch = await bcrypt.compare(userInfo.password, user.password); //comparando a senha recebida com a senha que consta no servidor

    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }
    //gerando o token jwt
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json(token);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Algo deu errado, tente novamente", error: error });
    console.log(error);
  }
});

export default router;
