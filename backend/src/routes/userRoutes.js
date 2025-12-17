import express from "express";
const router = express.Router();
import meController from "../controllers/user/meController.js";
import newCreditCard from "../controllers/user/creditCard/newCreditCard.js";
import createKey from "../controllers/user/keys/createKey.js";

router.use("/", meController);
router.use("/card", newCreditCard);
router.use("/keys", createKey);

export default router;
