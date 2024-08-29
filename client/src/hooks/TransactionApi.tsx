import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateTransaction = () => {
	const queryClient = useQueryClient();

	const {
		mutate: createTransaction,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async (transactionData) => {
			try {
				const response = await fetch(`$${API_BASE_URL}/api/transactions`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(transactionData),
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
			queryClient.invalidateQueries({ queryKey: ["transaction"] });
			toast.success("Transaction added successfully");
		},
		onError: (error) => {
			console.error("Transaction creation failed:", error);
			toast.error("Failed to add transaction");
		},
	});

	return { createTransaction, isPending, isError, error };
};
