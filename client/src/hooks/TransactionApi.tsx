import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionType } from "../../../shared/types";
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
							"all inputs are required",
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
			queryClient.invalidateQueries({
				queryKey: ["categoryStatistics"],
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

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	const {
		mutate: updateTransaction,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async (transactionData: {
			id: string;
			data: TransactionData;
		}) => {
			try {
				const bodyData = {
					...transactionData.data,
					date: transactionData.data.date.toISOString(),
				};

				const response = await fetch(
					`${API_BASE_URL}/api/transaction/${transactionData.id}`,
					{
						method: "PUT",
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
							"Failed to update transaction",
					);
				}
				return data;
			} catch (error) {
				console.error(
					"Update transaction failed:",
					error,
				);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
			queryClient.invalidateQueries({
				queryKey: ["categoryStatistics"],
			});
			toast.success("Transaction updated successfully");
		},
		onError: (error) => {
			console.error("Transaction update failed:", error);
			toast.error("Failed to update transaction");
		},
	});
	return { updateTransaction, isPending, isError, error };
};

export const useGetTransaction = (transactionId: string) => {
	const {
		data: transaction,
		isLoading,
		isError,
	} = useQuery<TransactionType>({
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

	return { transaction, isLoading, isError };
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

export type CategoryStatistics = {
	category: string;
	totalAmount: number;
};

export const useCategoryStatistics = () => {
	const {
		data: statistics,
		isLoading,
		isError,
	} = useQuery<CategoryStatistics[]>({
		queryKey: ["categoryStatistics"],
		queryFn: async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/transaction/category-statistics`,
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
							"Unable to fetch category statistics",
					);
				}

				return data;
			} catch (error) {
				console.error(
					"Failed to fetch category statistics:",
					error,
				);
				toast.error(
					"Failed to fetch category statistics",
				);
			}
		},
		retry: 1,
	});

	return { statistics, isLoading, isError };
};

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteTransaction, isPending } = useMutation({
		mutationFn: async (transactionId: string) => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/transaction/${transactionId}`,
					{
						method: "DELETE",
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
							"Failed to delete transaction",
					);
				}
			} catch (error) {
				console.error(
					"Delete transaction failed:",
					error,
				);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
			queryClient.invalidateQueries({
				queryKey: ["categoryStatistics"],
			});
			toast.success("Transaction deleted successfully");
		},
		onError: (error) => {
			console.error("Transaction deletion failed:", error);
			toast.error("Failed to delete transaction");
		},
	});
	return { deleteTransaction, isPending };
};
