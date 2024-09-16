"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cloudinary_1 = require("cloudinary");
const updateUser = async (req, res) => {
    const { firstName, lastName, username, currentPassword, newPassword } = req.body;
    const profileImg = req.file;
    const userId = req.user._id;
    try {
        let user = await user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found" });
        }
        // Check if the updated username already exists
        if (username !== user.username) {
            const existingUser = await user_model_1.default.findOne({ username });
            if (existingUser) {
                return res.status(400).json({
                    error: "Username already exists",
                });
            }
        }
        // Ensure both current password and new password are provided if updating the password
        if ((!newPassword && currentPassword) ||
            (!currentPassword && newPassword)) {
            return res.status(400).json({
                error: "Please provide both current password and new password",
            });
        }
        if (currentPassword && newPassword) {
            const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
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
            const salt = await bcryptjs_1.default.genSalt(10);
            user.password = await bcryptjs_1.default.hash(newPassword, salt);
        }
        // Handle profile image update
        if (profileImg) {
            // If the user already has a profile image, remove it from Cloudinary
            if (user.profileImg) {
                await cloudinary_1.v2.uploader.destroy(user.profileImg
                    .split("/")
                    .pop()
                    ?.split(".")[0] || "");
            }
            // Upload the new profile image
            const uploadedResponse = await cloudinary_1.v2.uploader.upload(profileImg.path);
            user.profileImg = uploadedResponse.secure_url;
        }
        else {
            user.profileImg = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
        }
        // Update other user fields
        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.username = username ?? user.username;
        // Save updated user information
        user = await user.save();
        // Remove password from the response object
        user.password = null;
        // Send updated user data as a response
        return res.status(200).json(user);
    }
    catch (error) {
        (0, errorHandler_1.default)(res, error, "updateUser");
    }
};
exports.updateUser = updateUser;
