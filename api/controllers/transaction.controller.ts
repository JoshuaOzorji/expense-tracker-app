import { Request, Response } from "express";
import handleServerError from "../utils/errorHandler";
import Transaction from "../models/transaction.model";
import { Document, ObjectId, SortOrder } from "mongoose";
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
			return res
				.status(404)
				.json({ message: "Transaction not found" });
		}
		res.status(200).json(transaction);
	} catch (error: any) {
		handleServerError(res, error, "updateTransaction");
	}
};

export const deleteTransaction = async (req: Request, res: Response) => {
	try {
		const transactionId = req.params.id;

		const transaction = await Transaction.findByIdAndDelete(
			transactionId,
		);

		if (!transaction) {
			return res
				.status(200)
				.json({ message: "Transaction not found" });
		}
		res.status(200).json({
			message: "Transaction deleted successfully",
		});
	} catch (error: any) {
		handleServerError(res, error, "deleteTransaction");
	}
};

interface TransactionType extends Document {
	createdAt: Date;
	updatedAt: Date;
	userId: ObjectId;
	date: Date;
	description: string;
	paymentType: "cash" | "card" | "transfer";
	category: "investments" | "savings" | "essentials" | "discretionary";
	amount: number;
	location?: string;
	formattedDate?: string;
}

export const getTransaction = async (req: Request, res: Response) => {
	try {
		// const { id } = req.params;
		const transactionId = req.params.id;

		const transaction = (await Transaction.findById(
			transactionId,
		)) as TransactionType;

		if (!transaction) {
			return res
				.status(404)
				.json({ message: "Transaction not found" });
		}

		const formattedDate = formatDate(new Date(transaction.date));

		res.status(200).json({
			...transaction.toObject(),
			formattedDate,
		});
	} catch (error: any) {
		handleServerError(res, error, "getTransaction");
	}
};

export const getTransactions = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;

		const allowedSortFields = ["category", "amount", "paymentType"];
		const sortField = req.query.sortField as string;

		if (sortField && !allowedSortFields.includes(sortField)) {
			return res
				.status(400)
				.json({ error: "Invalid sort field" });
		}

		const sortOrder: SortOrder = sortField === "amount" ? -1 : 1;

		const sortCriteria: { [key: string]: SortOrder } = sortField
			? { [sortField]: sortOrder, date: 1 }
			: { date: 1 };

		const transactions = await Transaction.find({ userId }).sort(
			sortCriteria,
		);

		res.status(200).json(transactions);
	} catch (error: any) {
		handleServerError(res, error, "getTransactions");
	}
};
