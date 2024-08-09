import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { updateUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/update", protectRoute, updateUser);

export default router;
