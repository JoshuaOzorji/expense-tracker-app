import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB";
import authRoutes from "./routes/auth.route";

import { Request, Response } from "express";

dotenv.config();
const app = express();

app.use(express.json({ limit: "5mb" }));

app.use("/api/auth", authRoutes);

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
