"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectMongoDB_1 = __importDefault(require("./db/connectMongoDB"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const transaction_route_1 = __importDefault(require("./routes/transaction.route"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Multer configuration
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "5mb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use("/api/auth", auth_route_1.default);
app.use("/api/user", user_route_1.default);
app.use("/api/transaction", transaction_route_1.default);
// Test route
// app.get("/", (req: Request, res: Response) => {
// 	res.send("Server is running!");
// });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    (0, connectMongoDB_1.default)();
});
