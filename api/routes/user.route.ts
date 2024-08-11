import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { updateUser } from "../controllers/user.controller";

const router = express.Router();

router.patch("/update", protectRoute, updateUser);

export default router;
