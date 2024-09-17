import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SignUpType {
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
	email: string;
	gender: string;
}

export const useSignUp = () => {
	const queryClient = useQueryClient();

	const {
		mutate: signUp,
		isError,
		isPending,
		error,
	} = useMutation({
		mutationFn: async ({
			username,
			firstName,
			lastName,
			password,
			confirmPassword,
			email,
			gender,
		}: SignUpType) => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/auth/signup`,
					{
						method: "POST",
						headers: {
							"Content-Type":
								"application/json",
						},
						body: JSON.stringify({
							username,
							firstName,
							lastName,
							password,
							confirmPassword,
							email,
							gender,
						}),
						credentials: "include",
					},
				);

				const data = await response.json();
				if (!response.ok)
					throw new Error(
						data.error ||
							"Failed to create account",
					);
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({
				queryKey: ["authUser"],
			});
		},
	});
	return { signUp, isError, isPending, error };
};

export const useAuthUser = () => {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/auth/me`,
					{
						credentials: "include",
					},
				);
				const data = await response.json();
				if (data.error) return null;
				if (!response.ok) {
					throw new Error(
						data.error ||
							"Something went wrong",
					);
				}
				return data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		retry: false,
	});

	return { authUser, isLoading };
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	const {
		mutate: loginMutation,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async (loginData: {
			identifier: string;
			password: string;
		}) => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/auth/login`,
					{
						method: "POST",
						headers: {
							"Content-Type":
								"application/json",
						},
						body: JSON.stringify(loginData),
						credentials: "include",
					},
				);

				const data = await response.json();
				if (!response.ok) {
					throw new Error(
						data.message || "Login failed",
					);
				}

				return data;
			} catch (error) {
				console.error("Login error:", error);
				throw error;
			}
		},
		onSuccess: (data) => {
			toast.success("Login successful");
			queryClient.setQueryData(["authUser"], data);
			queryClient.invalidateQueries({
				queryKey: ["authUser"],
			});
		},
	});
	return { loginMutation, isPending, isError, error };
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/auth/logout`,
					{
						method: "POST",
						credentials: "include",
					},
				);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.error ||
							"Unable to logout",
					);
				}
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Logout successfully");
			queryClient.invalidateQueries({
				queryKey: ["authUser"],
			});
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			toast.error("Logout failed");
		},
	});

	return { logout };
};
