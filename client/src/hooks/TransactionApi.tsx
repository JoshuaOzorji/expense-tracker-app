import { useMutation, useQueryClient } from "@tanstack/react-query";
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
