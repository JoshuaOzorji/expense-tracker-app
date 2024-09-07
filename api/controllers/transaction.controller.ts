import { Request, Response } from "express";
import handleServerError from "../utils/errorHandler";
import Transaction from "../models/transaction.model";
import { Document, ObjectId, SortOrder } from "mongoose";
import { formatDate } from "../utils/formatDate";
import { TransactionType } from "../../shared/types";

export const createTransaction = async (req: Request, res: Response) => {
	try {
		const { amount } = req.body;

		if (amount < 1) {
			return res
				.status(400)
				.json({ error: "Amount must be at least 1" });
		}
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

		console.log("Transaction ID:", transactionId);

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

export const getTransaction = async (req: Request, res: Response) => {
	try {
		// const { id } = req.params;
		const transactionId = req.params.id;

		const transaction = await Transaction.findById(transactionId);

		if (!transaction) {
			return res
				.status(404)
				.json({ message: "Transaction not found" });
		}

		const formattedDate = formatDate(new Date(transaction.date));

		const transactionData: TransactionType = {
			_id: transaction._id.toString(),
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
			userId: transaction.userId.toString(),
			description: transaction.description,
			paymentType: transaction.paymentType,
			date: transaction.date,
			category: transaction.category,
			amount: transaction.amount,
			location: transaction.location ?? undefined,
			formattedDate: formatDate(transaction.date),
		};
		res.status(200).json(transactionData);
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
		const dateSortOrder: SortOrder = -1;

		const sortCriteria: { [key: string]: SortOrder } = sortField
			? { [sortField]: sortOrder, date: dateSortOrder }
			: { date: dateSortOrder };

		const transactions = await Transaction.find({ userId }).sort(
			sortCriteria,
		);

		res.status(200).json(transactions);
	} catch (error: any) {
		handleServerError(res, error, "getTransactions");
	}
};

export const categoryStatistics = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;

		const transactions = await Transaction.find({ userId });

		const categoryMap: { [key: string]: number } = {};

		transactions.forEach((transaction) => {
			if (!categoryMap[transaction.category]) {
				categoryMap[transaction.category] = 0;
			}
			categoryMap[transaction.category] += transaction.amount;
		});

		const statistics = Object.entries(categoryMap).map(
			([category, totalAmount]) => ({
				category,
				totalAmount,
			}),
		);

		res.status(200).json(statistics);
	} catch (error: any) {
		handleServerError(res, error, "categoryStatistics");
	}
};
