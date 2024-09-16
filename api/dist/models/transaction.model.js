"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: { type: String, required: true },
    paymentType: {
        type: String,
        enum: ["cash", "card", "transfer"],
        required: true,
    },
    category: {
        type: String,
        enum: [
            "investments",
            "savings",
            "essentials",
            "discretionary",
        ],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
