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

				const response = await fetch(`${API_BASE_URL}/api/transaction/create`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(bodyData),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Unable to create transaction");
				}
			} catch (error) {
				console.error("Create transaction failed:", error);
				throw error;
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			toast.success("Transaction added successfully");
		},
		onError: (error) => {
			console.error("Transaction creation failed:", error);
			toast.error("Failed to add transaction");
		},
	});

	return { createTransaction, isPending, isError, error };
};

export const useGetTransaction = (transactionId: string) => {
	const { data: transaction, isLoading } = useQuery({
		queryKey: ["transaction", transactionId],
		queryFn: async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/transaction/${transactionId}`,
					{
						method: "GET",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Unable to fetch transaction");
				}

				return data;
			} catch (error) {
				console.error("Failed to fetch transaction:", error);
				toast.error("Failed to fetch transaction");
			}
		},
	});

	return { transaction, isLoading };
};

// interface Transaction {
// 	description: string;
// 	paymentType: string;
// 	category: string;
// 	amount: number;
// 	location: string;
// 	date: Date;
// }

// interface UseGetTransactionsParams {
// 	sortField?: string;
// 	sortOrder?: "asc" | "desc";
// }

// export const useGetTransactions = ({
// 	sortField,
// 	sortOrder,
// }: UseGetTransactionsParams = {}) => {
// 	const queryKey = ["transactions", { sortField, sortOrder }];

// 	const { data: transactions, isLoading } = useQuery(queryKey, async () => {
// 		try {
// 			const url = new URL(`${API_BASE_URL}/api/transactions`);
// 			if (sortField) url.searchParams.append("sortField", sortField);
// 			if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

// 			const response = await fetch(url.toString(), {
// 				method: "GET",
// 				credentials: "include",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			});

// 			const data = await response.json();

// 			if (!response.ok) {
// 				throw new Error(data.error || "Unable to fetch transactions");
// 			}

// 			return data;
// 		} catch (error) {
// 			console.error("Fetch transactions failed:", error);
// 			toast.error("Failed to load transactions");
// 			throw error;
// 		}
// 	});

// 	return { transactions, isLoading };
// };

interface Transaction {
	_id: string;
	description: string;
	paymentType: string;
	category: string;
	amount: number;
	location: string;
	date: Date;
}

interface UseGetTransactionsParams {
	sortField?: string;
	sortOrder?: "asc" | "desc";
}

export const useGetTransactions = ({
	sortField,
	sortOrder,
}: UseGetTransactionsParams = {}) => {
	// Define a query key as a tuple with a string and an object for dynamic parameters
	const queryKey: QueryKey = ["transactions", { sortField, sortOrder }];

	const fetchTransactions = async (): Promise<Transaction[]> => {
		try {
			const url = new URL(`${API_BASE_URL}/api/transaction`);
			if (sortField) url.searchParams.append("sortField", sortField);
			if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

			const response = await fetch(url.toString(), {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Unable to fetch transactions");
			}

			return data;
		} catch (error) {
			console.error("Fetch transactions failed:", error);
			toast.error("Failed to load transactions");
			throw error; // Rethrow to ensure `useQuery` handles it as a failed state
		}
	};

	// Use useQuery with a typed query key and query function
	const {
		data: transactions,
		isLoading,
		isError,
		error,
	} = useQuery<Transaction[], Error>(queryKey, fetchTransactions);

	return { transactions, isLoading, isError, error };
};
