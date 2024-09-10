import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { InputField } from "./InputFields";
import { useUpdateUser } from "@/hooks/UserApi";
import { useAuthUser } from "@/hooks/AuthApi";
import { useEffect, useState } from "react";

const UserProfile = () => {
	const { authUser, isLoading } = useAuthUser();
	const { updateUser, isPending, isError, error } = useUpdateUser();
	const [open, setOpen] = useState(false);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		currentPassword: "",
		newPassword: "",
	});

	useEffect(() => {
		if (authUser) {
			setFormData({
				firstName: authUser.firstName || "",
				lastName: authUser.lastName || "",
				username: authUser.username || "",
				currentPassword: "",
				newPassword: "",
			});
		}
	}, [authUser]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateUser(formData);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button onClick={() => setOpen(true)}>
					Edit Profile
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='grid gap-2 py-4'>
					<div className='flex items-center justify-between gap-2'>
						<span className='w-full'>
							<InputField
								label='First Name'
								id='firstName'
								type='text'
								name='firstName'
								placeholder='First Name'
								onChange={
									handleInputChange
								}
								value={
									formData.firstName
								}
							/>
						</span>
						<span className='w-full'>
							<InputField
								label='Last Name'
								name='lastName'
								id='lastName'
								type='text'
								placeholder='Last Name'
								onChange={
									handleInputChange
								}
								value={
									formData.lastName
								}
							/>
						</span>
					</div>

					<span className='w-full'>
						<InputField
							label='Username'
							id='username'
							name='username'
							type='text'
							placeholder='Username'
							onChange={
								handleInputChange
							}
							value={
								formData.username
							}
						/>
					</span>

					<div className='flex items-center justify-between gap-2'>
						<span className='w-full'>
							<InputField
								label='Current Password'
								id='currentPassword'
								type='password'
								name='currentPassword'
								placeholder='Current Password'
								onChange={
									handleInputChange
								}
								value={
									formData.currentPassword
								}
							/>
						</span>
						<span className='w-full'>
							<InputField
								label='New Password'
								id='newPassword'
								name='newPassword'
								type='password'
								placeholder='New Password'
								onChange={
									handleInputChange
								}
								value={
									formData.newPassword
								}
							/>
						</span>
					</div>

					{isError && error && (
						<p className='text-sm font-light text-center text-red-600 rounded-md'>
							{error.message}
						</p>
					)}

					<DialogFooter>
						<button
							type='submit'
							disabled={isPending}
							className='buttonSm'>
							{isPending
								? "Saving..."
								: "Save changes"}
						</button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UserProfile;
