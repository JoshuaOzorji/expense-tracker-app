"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.mailtrapClient = void 0;
const mailtrap_1 = require("mailtrap");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;
if (!TOKEN || !ENDPOINT) {
    throw new Error("Mailtrap token and endpoint must be set");
}
exports.mailtrapClient = new mailtrap_1.MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});
exports.sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Diz & Dat",
};
