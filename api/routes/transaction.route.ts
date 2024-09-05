import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import {
	categoryStatistics,
	createTransaction,
	deleteTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/create", protectRoute, createTransaction);

router.put("/:id", protectRoute, updateTransaction);

router.get("/category-statistics", protectRoute, categoryStatistics);

router.get("/:id", protectRoute, getTransaction);

router.get("/", protectRoute, getTransactions);

router.delete("/:id", protectRoute, deleteTransaction);

export default router;
