import { Request, Response } from "express";
import handleServerError from "../utils/errorHandler";
import Transaction from "../models/transaction.model";
import { SortOrder } from "mongoose"; // Ensure this is imported
import { formatDate } from "../utils/formatDate";

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

		transaction.formattedDate = formatDate(new Date(transaction.date));

		res.status(200).json(transaction);
	} catch (error: any) {
		handleServerError(res, error, "getTransaction");
	}
};

export const getTransactions = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;

		const allowedSortFields = ["category", "amount", "paymentType"];
		const sortField = req.query.sortField as string;

		// Validate the sortField, if provided
		if (sortField && !allowedSortFields.includes(sortField)) {
			return res.status(400).json({ error: "Invalid sort field" });
		}

		// Determine sort order for the sortField
		const sortOrder: SortOrder = sortField === "amount" ? -1 : 1;

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
