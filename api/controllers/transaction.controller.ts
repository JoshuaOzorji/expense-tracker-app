import { Request, Response } from "express";
import handleServerError from "../utils/errorHandler";
import Transaction from "../models/transaction.model";
import { SortOrder } from "mongoose"; // Ensure this is imported

export const createTransaction = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id.toString();

		const transaction = new Transaction({ ...req.body, userId });

		await transaction.save();

		res.status(201).json(transaction);
	} catch (error: any) {
		handleServerError(res, error, "createTransaction");
	}
};

export const updateTransaction = async (req: Request, res: Response) => {
	try {
		const transactionId = req.params.id;

		const transaction = await Transaction.findByIdAndUpdate(
			transactionId,
			req.body,
			{ new: true, runValidators: true },
		);

		if (!transaction) {
			return res.status(404).json({ message: "Transaction not found" });
		}
		res.status(200).json(transaction);
	} catch (error: any) {
		handleServerError(res, error, "updateTransaction");
	}
};

export const deleteTransaction = async (req: Request, res: Response) => {
	try {
		const transactionId = req.params.id;

		const transaction = await Transaction.findByIdAndDelete(transactionId);

		if (!transaction) {
			return res.status(200).json({ message: "Transaction not found" });
		}
		res.status(200).json({ message: "Transaction deleted successfully" });
	} catch (error: any) {
		handleServerError(res, error, "deleteTransaction");
	}
};

export const getTransaction = async (req: Request, res: Response) => {
	try {
		// const { id } = req.params;
		const transactionId = req.params.id;

		const transaction = await Transaction.findById(transactionId);

		if (!transaction) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		res.status(200).json(transaction);
	} catch (error: any) {
		handleServerError(res, error, "getTransaction");
	}
};

// export const getTransactions = async (req: Request, res: Response) => {
// 	try {
// 		const userId = req.user._id;

// 		const transactions = await Transaction.find({ userId }).sort({
// 			createdAt: -1,
// 		});

// 		res.status(200).json(transactions);
// 	} catch (error: any) {
// 		handleServerError(res, error, "getTransactions");
// 	}
// };

// export const getTransactions = async (req: Request, res: Response) => {
// 	try {
// 		const userId = req.user._id;
// 		const sortField = (req.query.sortField as string) || "createdAt";
// 		const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

// 		// Ensure the sortField is one of the allowed fields
// 		const allowedSortFields = [
// 			"category",
// 			"amount",
// 			"date",
// 			"paymentType",
// 			"createdAt",
// 		];
// 		if (!allowedSortFields.includes(sortField)) {
// 			return res.status(400).json({ error: "Invalid sort field" });
// 		}

// 		// Fetch and sort transactions
// 		const transactions = await Transaction.find({ userId }).sort({
// 			[sortField]: sortOrder,
// 		});

// 		res.status(200).json(transactions);
// 	} catch (error: any) {
// 		handleServerError(res, error, "getTransactions");
// 	}
// };

export const getTransactions = async (req: Request, res: Response) => {
	try {
		// Extract user ID
		const userId = req.user._id;

		// Define allowed sort fields, excluding 'createdAt' and 'date'
		const allowedSortFields = ["category", "amount", "paymentType"];
		const sortField = req.query.sortField as string;
		const sortOrder: SortOrder = req.query.sortOrder === "asc" ? 1 : -1;

		// Validate the sortField, if provided
		if (sortField && !allowedSortFields.includes(sortField)) {
			return res.status(400).json({ error: "Invalid sort field" });
		}

		// Create sort criteria, combining selected field with default date sorting
		const sortCriteria: { [key: string]: SortOrder } = sortField
			? { [sortField]: sortOrder, date: 1 }
			: { date: 1 };

		// Fetch transactions based on sort criteria
		const transactions = await Transaction.find({ userId }).sort(sortCriteria);

		// Return transactions
		res.status(200).json(transactions);
	} catch (error: any) {
		handleServerError(res, error, "getTransactions");
	}
};
