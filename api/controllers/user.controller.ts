import { Request, Response } from "express";
import User from "../models/user.model";
import handleServerError from "../utils/errorHandler";
import bcrypt from "bcryptjs";

export const updateUser = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		profileImg,
		username,
		currentPassword,
		newPassword,
	} = req.body;

	const userId = req.user._id;

	try {
		let user = await User.findById(userId);

		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}

		// Check if the updated username already exists
		if (username !== user.username) {
			const existingUser = await User.findOne({
				username,
			});
			if (existingUser) {
				return res.status(400).json({
					error: "Username already exists",
				});
			}
		}

		// check if newPassword and currentPassword are provided
		if (
			(!newPassword && currentPassword) ||
			(!currentPassword && newPassword)
		) {
			return res.status(400).json({
				error: "Please provide new password and current password",
			});
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(
				currentPassword,
				user.password,
			);

			if (!isMatch) {
				return res.status(400).json({
					error: "Current password is incorrect",
				});
			}

			if (newPassword.length < 6) {
				return res.status(400).json({
					error: "Password must be at least 6 characters long",
				});
			}

			//TODO: profile image update

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}
		// Updates new value if provided
		user.firstName = firstName ?? user.firstName;
		user.lastName = lastName ?? user.lastName;
		user.username = username ?? user.username;

		user = await user.save();

		(user as any).password = null;

		return res.status(200).json(user);
	} catch (error: any) {
		handleServerError(res, error, "updateUser");
	}
};
