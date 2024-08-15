import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN as string;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT as string;

if (!TOKEN || !ENDPOINT) {
	throw new Error("Mailtrap token and endpoint must be set");
}

export const mailtrapClient = new MailtrapClient({
	endpoint: ENDPOINT,
	token: TOKEN,
} as any);

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Diz & Dat",
};
