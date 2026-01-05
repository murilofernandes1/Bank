import express from "express";
import payWithCard from "../controllers/creditcard/payWithCard.js";
import newCreditCard from "../controllers/creditcard/newCreditCard.js";
import payInvoiceController from "../controllers/creditcard/payInvoiceController.js";
const router = express.Router();

router.use("/transfer", payWithCard);
router.use("/create", newCreditCard);
router.use("/invoice", payInvoiceController);

export default router;
