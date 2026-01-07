import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import pixRoutes from "./src/routes/pixRoutes.js";
import cardRoutes from "./src/routes/cardRoutes.js";
import auth from "./src/middleware/auth.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/auth", authRoutes);

app.use("/me", auth, userRoutes);

app.use("/pix", auth, pixRoutes);

app.use("/card", auth, cardRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
