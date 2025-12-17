import express from "express";
import registerController from "../controllers/auth/registerController.js";
import loginController from "../controllers/auth/loginController.js";
import pinController from "../controllers/auth/pinController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/pin", auth, pinController);

export default router;
