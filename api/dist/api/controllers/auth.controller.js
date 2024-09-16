"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.getMe = exports.logout = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const generateToken_1 = require("../utils/generateToken");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const emails_1 = require("../mailtrap/emails");
const signup = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password, confirmPassword, gender, } = req.body;
        // if (
        // 	!username ||
        // 	!firstName ||
        // 	!lastName ||
        // 	!email ||
        // 	!password ||
        // 	!confirmPassword ||
        // 	!gender
        // ) {
        // 	return res.status(400).json({ error: "All fields are required" });
        // }
        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        // Check if username is already taken
        const existingUser = await user_model_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }
        // Check if email is already taken
        const existingEmail = await user_model_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }
        // Ensure password meets the length requirement
        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters" });
        }
        // Hash the password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Generate a verification token
        // const verificationToken = Math.floor(
        // 	100000 + Math.random() * 900000,
        // ).toString();
        // Create new user
        const newUser = new user_model_1.default({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            gender,
            // verificationToken,
            // verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });
        // Save the user and send verification email
        if (newUser) {
            (0, generateToken_1.generateTokenAndSetCookie)(newUser._id.toString(), res);
            await newUser.save();
            // await sendVerificationEmail(newUser.email, verificationToken);
            // Send response with user data (excluding password)
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
        }
        else {
            res.status(400).json({
                error: "Invalid user data",
            });
        }
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "signup");
    }
};
exports.signup = signup;
const login = async (req, res) => {
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
        const user = await user_model_1.default.findOne(isEmail ? { email: identifier } : { username: identifier });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Wrong username/email or password" });
        }
        //check if the password matches
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!user || !isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        (0, generateToken_1.generateTokenAndSetCookie)(user._id.toString(), res);
        user.lastLogin = new Date();
        await user.save();
        const userObject = user.toObject();
        res.status(201).json({
            success: true,
            message: "Login successful",
            user: { ...userObject, password: undefined },
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "login");
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "logout");
    }
};
exports.logout = logout;
const getMe = async (req, res) => {
    const user = await user_model_1.default.findById(req.user._id).select("-password");
    res.status(200).json(user);
    try {
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "getMe");
    }
};
exports.getMe = getMe;
const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await user_model_1.default.findOne({
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
        const userObject = user.toObject();
        await (0, emails_1.sendWelcomeEmail)(user.email, user.firstName);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: { ...userObject, password: undefined },
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "verifyEmail");
    }
};
exports.verifyEmail = verifyEmail;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        // Send email
        await (0, emails_1.sendPasswordResetEmail)(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "forgotPassword");
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await user_model_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid or expired reset token" });
        }
        //Update user password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        await (0, emails_1.sendResetSuccessEmail)(user.email);
        res
            .status(200)
            .json({ success: true, message: "Password reset successfully" });
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "resetPassword");
    }
};
exports.resetPassword = resetPassword;
