import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //aqui ele vai consultar o token presente no header do navegador (ou localStorage)

  if (!authHeader) {
    res.status(401).json({ message: "Acesso negado: nenhum token" });
  }

  const token = authHeader.split(" ")[1];
  //aqui ele faz a divisão do bearer token e o consulta

  if (!token) {
    res.status(401).json({ message: "Token ausente" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next(); //se tudo correr bem, acesso liberado.
  } catch (error) {
    res.status(401).json({ message: "Token inválido", error: error.message });
    console.log(error);
  }
};
export default auth;
