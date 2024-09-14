import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface UserDataProps {
	firstName?: string;
	lastName?: string;
	profileImg?: File | string;
	username?: string;
	currentPassword?: string;
	newPassword?: string;
}
export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	const {
		mutate: updateUser,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async (userData: UserDataProps) => {
			try {
				const formData = new FormData();

				Object.entries(userData).forEach(
					([key, value]) => {
						if (value instanceof File) {
							formData.append(
								key,
								value,
							);
						} else if (
							typeof value ===
							"string"
						) {
							formData.append(
								key,
								value,
							);
						}
					},
				);
				const response = await fetch(
					`${API_BASE_URL}/api/user/update`,
					{
						method: "PATCH",
						credentials: "include",
						body: formData,
					},
				);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.error ||
							"Failed to update user",
					);
				}

				return data;
			} catch (error) {
				console.error("Update user failed:", error);
				throw error;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["authUser"],
			});
			toast.success("User updated successfully");
		},
		onError: (error) => {
			console.error("User update failed:", error);
			toast.error("Failed to update user");
		},
	});
	return { updateUser, isPending, isError, error };
};
