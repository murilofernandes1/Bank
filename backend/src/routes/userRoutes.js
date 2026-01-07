import express from "express";
const router = express.Router();
import meController from "../controllers/user/meController.js";
import createKey from "../controllers/user/keys/createKey.js";
import deleteKey from "../controllers/user/keys/deleteKey.js";
import myTransfersController from "../controllers/transfers/myTransfersController.js";
import seeReceiptController from "../controllers/transfers/seeReceiptController.js";
import createSavingController from "../controllers/savings/createSavingController.js";
import mySavings from "../controllers/savings/mySavingsController.js";
import depositAmountController from "../controllers/savings/depositAmountController.js";
import withdrawAmountController from "../controllers/savings/withdrawAmountController.js";
import deleteSavingController from "../controllers/savings/deleteSavingController.js";

router.use("/", meController);
router.use("/keys", createKey);
router.use("/keys/:id", deleteKey);
router.use("/transfers", myTransfersController);
router.use("/receipts", seeReceiptController);
router.use("/savings", createSavingController);
router.use("/savings", mySavings);
router.use("/savings", depositAmountController);
router.use("/savings", withdrawAmountController);
router.use("/savings/:id", deleteSavingController);

export default router;
