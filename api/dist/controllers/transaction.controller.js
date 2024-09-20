"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryStatistics = exports.getTransactions = exports.getTransaction = exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const formatDate_1 = require("../utils/formatDate");
const createTransaction = async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount < 1) {
            return res
                .status(400)
                .json({ error: "Amount must be at least 1" });
        }
        const userId = req.user._id.toString();
        const transaction = new transaction_model_1.default({ ...req.body, userId });
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "createTransaction");
    }
};
exports.createTransaction = createTransaction;
const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await transaction_model_1.default.findByIdAndUpdate(transactionId, req.body, { new: true, runValidators: true });
        if (!transaction) {
            return res
                .status(404)
                .json({ message: "Transaction not found" });
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "updateTransaction");
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        console.log("Transaction ID:", transactionId);
        const transaction = await transaction_model_1.default.findByIdAndDelete(transactionId);
        if (!transaction) {
            return res
                .status(200)
                .json({ message: "Transaction not found" });
        }
        res.status(200).json({
            message: "Transaction deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "deleteTransaction");
    }
};
exports.deleteTransaction = deleteTransaction;
const getTransaction = async (req, res) => {
    try {
        // const { id } = req.params;
        const transactionId = req.params.id;
        const transaction = await transaction_model_1.default.findById(transactionId);
        if (!transaction) {
            return res
                .status(404)
                .json({ message: "Transaction not found" });
        }
        const formattedDate = (0, formatDate_1.formatDate)(new Date(transaction.date));
        const formatAmount = (amount) => {
            return amount.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
        };
        const transactionData = {
            _id: transaction._id.toString(),
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            userId: transaction.userId.toString(),
            description: transaction.description,
            paymentType: transaction.paymentType,
            date: transaction.date,
            category: transaction.category,
            amount: transaction.amount,
            formattedAmount: formatAmount(transaction.amount),
            location: transaction.location ?? undefined,
            formattedDate: (0, formatDate_1.formatDate)(transaction.date),
        };
        res.status(200).json(transactionData);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "getTransaction");
    }
};
exports.getTransaction = getTransaction;
const getTransactions = async (req, res) => {
    try {
        const userId = req.user._id;
        const allowedSortFields = ["category", "amount", "paymentType"];
        const sortField = req.query.sortField;
        if (sortField && !allowedSortFields.includes(sortField)) {
            return res
                .status(400)
                .json({ error: "Invalid sort field" });
        }
        const sortOrder = sortField === "amount" ? -1 : 1;
        const dateSortOrder = -1;
        const sortCriteria = sortField
            ? { [sortField]: sortOrder, date: dateSortOrder }
            : { date: dateSortOrder };
        const transactions = await transaction_model_1.default.find({ userId }).sort(sortCriteria);
        res.status(200).json(transactions);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "getTransactions");
    }
};
exports.getTransactions = getTransactions;
const categoryStatistics = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await transaction_model_1.default.find({ userId });
        const categoryMap = {};
        transactions.forEach((transaction) => {
            if (!categoryMap[transaction.category]) {
                categoryMap[transaction.category] = 0;
            }
            categoryMap[transaction.category] += transaction.amount;
        });
        const statistics = Object.entries(categoryMap).map(([category, totalAmount]) => ({
            category,
            totalAmount,
        }));
        res.status(200).json(statistics);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "categoryStatistics");
    }
};
exports.categoryStatistics = categoryStatistics;
