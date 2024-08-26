import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SignUpType {
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	gender: boolean;
}

export const useSignUp = () => {
	const queryClient = useQueryClient();

	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({
			username,
			firstName,
			lastName,
			password,
			email,
			gender,
		}: SignUpType) => {
			try {
				const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username,
						firstName,
						lastName,
						password,
						email,
						gender,
					}),
					credentials: "include",
				});

				const data = await response.json();
				if (!response.ok)
					throw new Error(data.error || "Failed to create account");
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});
	return { signUp: mutate, isError, isPending, error };
};
