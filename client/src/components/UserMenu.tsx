import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthUser, useLogout } from "@/hooks/AuthApi";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";

const UserMenu = () => {
	const { logout } = useLogout();
	const { authUser } = useAuthUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<img
					src={authUser?.profileImg}
					alt='logo'
					className='object-cover w-8 h-8 rounded-full'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='mr-3 md:mr-4'>
				<DropdownMenuLabel>
					Hi, {authUser?.firstName}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='hover:bg-none focus:bg-none'>
					<button
						className='justify-start w-full p-1 hover:bg-accent'
						onClick={(e) => {
							e.stopPropagation();
						}}>
						<UserProfile />
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem className='hover:bg-none focus:bg-none'>
					<Button
						size='sm'
						className='w-full text-left rounded-none bg-pry hover:text-pry hover:bg-accent'
						onClick={(e) => {
							e.preventDefault();
							logout();
						}}>
						Logout
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
