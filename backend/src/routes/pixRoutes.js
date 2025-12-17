import express from "express";
import findByKeyController from "../controllers/pix/findByKeyController.js";
import sendPixController from "../controllers/pix/sendPixController.js";
const router = express.Router();

router.use("/find", findByKeyController);
router.use("/send", sendPixController);

export default router;
