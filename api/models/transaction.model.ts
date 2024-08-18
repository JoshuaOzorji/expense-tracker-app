import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
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
			enum: ["savings", "expense", "investment"],
			required: true,
		},

		amount: {
			type: Number,
			required: true,
		},

		income: {
			type: Number,
			default: 0,
		},

		location: {
			type: String,
			required: true,
		},

		date: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
