import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });
  const token = authHeader.split(" ")[1] || authHeader;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Sessão expirada.");
        return res
          .status(401)
          .json({ message: "Sessão expirada. Faça login novamente." });
      }

      console.log("Token inválido", err);
      return res.status(401).json({ message: "Token inválido" });
    }

    req.userId = decoded.id;
    next();
  });
};

export default auth;
