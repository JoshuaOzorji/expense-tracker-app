import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import {
	createTransaction,
	deleteTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/create", protectRoute, createTransaction);

router.put("/:id", protectRoute, updateTransaction);

router.get("/", protectRoute, getTransactions);

router.get("/:id", protectRoute, getTransaction);

router.delete("/:id", protectRoute, deleteTransaction);

export default router;
