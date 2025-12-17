import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import pixRoutes from "./src/routes/pixRoutes.js";
import auth from "./src/middleware/auth.js";
const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/auth", authRoutes);

app.use("/me", auth, userRoutes);

app.use("/pix", auth, pixRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
