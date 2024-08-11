import { Request, Response } from "express";
import handleServerError from "../utils/errorHandler";
import Transaction from "../models/transaction.model";

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
	} catch (error: any) {
		handleServerError(res, error, "getTransaction");
	}
};

export const getTransactions = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;

		const transactions = await Transaction.find(userId);

		res.status(200).json(transactions);
	} catch (error: any) {
		handleServerError(res, error, "getTransaction");
	}
};
