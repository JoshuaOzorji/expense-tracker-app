import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TransactionData {
	description: string;
	paymentType: string;
	category: string;
	amount: number;
	location: string;
	date: Date;
}

export const useCreateTransaction = () => {
	const queryClient = useQueryClient();

	const {
		mutate: createTransaction,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async (transactionData: TransactionData) => {
			try {
				const bodyData = {
					...transactionData,
					date: transactionData.date.toISOString(),
				};

				const response = await fetch(
					`${API_BASE_URL}/api/transaction/create`,
					{
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type":
								"application/json",
						},
						body: JSON.stringify(bodyData),
					},
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.error ||
							"Unable to create transaction",
					);
				}
			} catch (error) {
				console.error(
					"Create transaction failed:",
					error,
				);
				throw error;
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
			toast.success("Transaction added successfully");
		},
		onError: (error) => {
			console.error("Transaction creation failed:", error);
			toast.error("Failed to add transaction");
		},
	});

	return { createTransaction, isPending, isError, error };
};

export interface TransactionType {
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	date: Date;
	description: string;
	paymentType: "cash" | "card" | "transfer";
	category: "investments" | "savings" | "essentials" | "discretionary";
	amount: number;
	location?: string;
	formattedDate?: string;
}

export const useGetTransaction = (transactionId: string) => {
	const { data: transaction, isLoading } = useQuery<TransactionType>({
		queryKey: ["transaction", transactionId],
		queryFn: async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/transaction/${transactionId}`,
					{
						method: "GET",
						credentials: "include",
						headers: {
							"Content-Type":
								"application/json",
						},
					},
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.error ||
							"Unable to fetch transaction",
					);
				}

				return data;
			} catch (error) {
				console.error(
					"Failed to fetch transaction:",
					error,
				);
				toast.error("Failed to fetch transaction");
			}
		},
	});

	return { transaction, isLoading };
};

interface Transaction {
	_id: string;
	description: string;
	paymentType: string;
	category: string;
	amount: number;
	location: string;
	date: Date;
	formattedDate?: string;
}

interface UseGetTransactionsParams {
	sortField?: string;
}

export const useGetTransactions = ({
	sortField,
}: UseGetTransactionsParams = {}) => {
	// Define the query function
	const fetchTransactions = async (): Promise<Transaction[]> => {
		try {
			const url = new URL(`${API_BASE_URL}/api/transaction`);
			if (sortField)
				url.searchParams.append("sortField", sortField);

			const response = await fetch(url.toString(), {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.error ||
						"Unable to fetch transactions",
				);
			}

			return data;
		} catch (error) {
			console.error("Fetch transactions failed:", error);
			toast.error("Failed to load transactions");
			throw error;
		}
	};

	// Pass the queryKey and queryFn as part of an options object
	const { data: transactions, isLoading } = useQuery<
		Transaction[],
		Error
	>({
		queryKey: ["transactions", { sortField }],
		queryFn: fetchTransactions,
	});

	return { transactions, isLoading };
};
