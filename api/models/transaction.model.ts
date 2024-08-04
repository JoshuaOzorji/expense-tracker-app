import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

	description: { type: String, required: true },

	paymentType: {
		type: String,
		enum: ["cash", "card"],
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

	location: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
