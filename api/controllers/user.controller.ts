import { Request, Response } from "express";
import User from "../models/user.model";
import handleServerError from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const updateUser = async (req: Request, res: Response) => {
	const { firstName, lastName, username, currentPassword, newPassword } =
		req.body;

	const profileImg = req.file;

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
			const existingUser = await User.findOne({ username });
			if (existingUser) {
				return res.status(400).json({
					error: "Username already exists",
				});
			}
		}

		// Ensure both current password and new password are provided if updating the password
		if (
			(!newPassword && currentPassword) ||
			(!currentPassword && newPassword)
		) {
			return res.status(400).json({
				error: "Please provide both current password and new password",
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

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		// Handle profile image update
		if (profileImg) {
			// If the user already has a profile image, remove it from Cloudinary
			if (user.profileImg) {
				await cloudinary.uploader.destroy(
					user.profileImg
						.split("/")
						.pop()
						?.split(".")[0] || "",
				);
			}

			// Upload the new profile image
			const uploadedResponse =
				await cloudinary.uploader.upload(
					profileImg.path,
				);
			user.profileImg = uploadedResponse.secure_url;
		} else {
			user.profileImg = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
		}

		// Update other user fields
		user.firstName = firstName ?? user.firstName;
		user.lastName = lastName ?? user.lastName;
		user.username = username ?? user.username;

		// Save updated user information
		user = await user.save();

		// Remove password from the response object
		(user as any).password = null;

		// Send updated user data as a response
		return res.status(200).json(user);
	} catch (error: any) {
		handleServerError(res, error, "updateUser");
	}
};
