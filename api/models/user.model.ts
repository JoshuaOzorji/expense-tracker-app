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

		profileImg: {
			type: String,
			default: "",
		},

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

userSchema.pre("save", function (next) {
	if (!this.profileImg) {
		this.profileImg = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&background=random&size=128&bold=true`;
	}
	next();
});

const User = mongoose.model("User", userSchema);

export default User;
