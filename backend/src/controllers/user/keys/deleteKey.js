import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.delete("/", async (req, res) => {
  const userId = req.userId;
  const keyId = req.params.id;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
  try {
    await prisma.pixKey.delete({
      where: { id: keyId },
    });
    return res.status(200).json({ message: "Chave deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel deletar a chave pix" });
    console.log(error);
    return;
  }
});
export default router;
