"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = require("../middleware/protectRoute");
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = express_1.default.Router();
router.post("/create", protectRoute_1.protectRoute, transaction_controller_1.createTransaction);
router.put("/:id", protectRoute_1.protectRoute, transaction_controller_1.updateTransaction);
router.get("/category-statistics", protectRoute_1.protectRoute, transaction_controller_1.categoryStatistics);
router.get("/:id", protectRoute_1.protectRoute, transaction_controller_1.getTransaction);
router.get("/", protectRoute_1.protectRoute, transaction_controller_1.getTransactions);
router.delete("/:id", protectRoute_1.protectRoute, transaction_controller_1.deleteTransaction);
exports.default = router;
