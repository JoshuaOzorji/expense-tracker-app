"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const protectRoute_1 = require("../middleware/protectRoute");
const auth_controller_2 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.get("/me", protectRoute_1.protectRoute, auth_controller_2.getMe);
router.post("/signup", auth_controller_1.signup);
router.post("/login", auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.post("/verify-email", auth_controller_1.verifyEmail);
router.post("/forgot-password", auth_controller_1.forgotPassword);
router.post("/reset-password/:token", auth_controller_1.resetPassword);
exports.default = router;
