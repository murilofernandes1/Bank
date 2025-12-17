import express from "express";
import findByKeyController from "../controllers/pix/findByKeyController.js";
const router = express.Router();

router.use("/find", findByKeyController);

export default router;
