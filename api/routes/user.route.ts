import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { updateUser } from "../controllers/user.controller";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.patch("/update", protectRoute, upload.single("profileImg"), updateUser);

export default router;
