import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },

		firstName: {
			type: String,
			required: true,
		},

		lastName: { type: String, required: true },

		email: { type: String, required: true, unique: true },

		password: { type: String, required: true, minLength: 6 },

		profileImg: { type: String, default: "" },

		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},

		lastLogin: {
			type: Date,
			default: Date.now,
		},

		isVerified: {
			type: Boolean,
			default: false,
		},

		resetPasswordToken: String,

		resetPasswordExpiresAt: Date,

		verificationToken: String,

		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
