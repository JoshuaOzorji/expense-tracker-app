import express from "express";
import {
	signup,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
} from "../controllers/auth.controller";
import { protectRoute } from "../middleware/protectRoute";
import { getMe } from "../controllers/auth.controller";

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
