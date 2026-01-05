import express from "express";
import payWithCard from "../controllers/creditcard/payWithCard";
import newCreditCard from "../controllers/creditcard/newCreditCard.js";
import payCreditCardController from "../controllers/creditcard/payCreditCardController.js";
const router = express.Router();

router.use("/transfer", payWithCard);
router.use("/create", newCreditCard);
router.use("/pay", payCreditCardController);

export default router;
