export interface TransactionType {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	date: any;
	description: string;
	paymentType: "cash" | "card" | "transfer";
	category: "investments" | "savings" | "essentials" | "discretionary";
	amount: number;
	location?: string;
	formattedDate?: string;
	formattedAmount?: string;
}
