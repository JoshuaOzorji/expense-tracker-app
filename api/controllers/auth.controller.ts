import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

import handleServerError from "../utils/errorHandler";

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
	try {
		const { identifier, password } = req.body;

		// Simple regex to check if the identifier is an email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isEmail = emailRegex.test(identifier);

		// Query the database using the appropriate field
		const user = await User.findOne({
			[isEmail ? "email" : "username"]: identifier,
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		//check if the password matches
		const isPasswordValid = await bcrypt.compare(password, user?.password);

		if (!user || !isPasswordValid) {
			return res.status(400).json({ message: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id.toString(), res);

		const userResponse = {
			_id: user._id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			profileImg: user.profileImg,
			gender: user.gender,
		};
		res.status(201).json({ message: "Login successful", user: userResponse });
	} catch (error: any) {
		handleServerError(res, error, "login");
	}
};
