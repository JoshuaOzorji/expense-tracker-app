import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

import handleServerError from "../utils/errorHandler";
import { sendVerificationEmail } from "../mailtrap/emails";

export const signup = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, username, email, password, gender } = req.body;

		if (
			!firstName ||
			!lastName ||
			!username ||
			!email ||
			!password ||
			!gender
		) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ username });

		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ error: "Password must be at least 6 characters" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: hashedPassword,
			gender,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id.toString(), res);

			await newUser.save();

			const userResponse = {
				_id: newUser._id,
				username: newUser.username,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email,
				profileImg: newUser.profileImg,
				gender: newUser.gender,
			};
			res.status(201).json(userResponse);
		} else {
			res.status(400).json({
				error: "Invalid user data",
			});
		}
	} catch (error: any) {
		handleServerError(res, error, "signup");
	}
};

export const login = async (req: Request, res: Response) => {
	const { identifier, password } = req.body;

	// Validate that either email or username and password are provided
	if (!identifier) {
		return res.status(400).json({ message: "Please enter username/email" });
	}

	if (!password) {
		return res.status(400).json({ message: "Please enter password" });
	}

	try {
		// Find the user by email or username
		const isEmail = identifier.includes("@");
		const user = await User.findOne(
			isEmail ? { email: identifier } : { username: identifier },
		);

		if (!user) {
			return res
				.status(400)
				.json({ message: "Wrong username/email or password" });
		}

		//check if the password matches
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!user || !isPasswordValid) {
			return res.status(400).json({ message: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id.toString(), res);

		res.status(201).json({ message: "Login successful" });
	} catch (error: any) {
		handleServerError(res, error, "login");
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("jwt", {
			sameSite: "none",
			secure: true,
			httpOnly: true,
		});

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		handleServerError(res, error, "logout");
	}
};

export const getMe = async (req: Request, res: Response) => {
	const user = await User.findById(req.user._id).select("-password");
	res.status(200).json(user);
	try {
	} catch (error: any) {
		handleServerError(res, error, "getMe");
	}
};

export const verifyEmail = async (req: Request, res: Response) => {
	const { code } = req.body;

	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired verification code",
			});
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;

		await user.save();
	} catch (error: any) {
		handleServerError(res, error, "verifyEmail");
	}
};

export const resetPassword = async (req: Request, res: Response) => {};

export const forgotPassword = async (req: Request, res: Response) => {};
