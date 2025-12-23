import express from "express";
const router = express.Router();
import meController from "../controllers/user/meController.js";
import newCreditCard from "../controllers/user/creditCard/newCreditCard.js";
import createKey from "../controllers/user/keys/createKey.js";
import deleteKey from "../controllers/user/keys/deleteKey.js";
import myTransfersController from "../controllers/transfers/myTransfersController.js";

router.use("/", meController);
router.use("/card", newCreditCard);
router.use("/keys", createKey);
router.use("/keys/:id", deleteKey);
router.use("/transfers", myTransfersController);

export default router;
