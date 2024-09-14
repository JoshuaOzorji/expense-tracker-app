import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import transactionRoutes from "./routes/transaction.route";

import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();

// Multer configuration

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "",
		credentials: true,
	}),
);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);

// Test route
// app.get("/", (req: Request, res: Response) => {
// 	res.send("Server is running!");
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});
