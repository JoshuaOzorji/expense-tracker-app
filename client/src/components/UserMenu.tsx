import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userImg from "/mrjosh.png";
import { useAuthUser, useLogout } from "@/hooks/AuthApi";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";

const UserMenu = () => {
	const { logout } = useLogout();
	const { authUser } = useAuthUser();

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className='outline-none'>
					<img
						src={userImg}
						alt='logo'
						className='object-cover w-8 h-8 rounded-full'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mr-3 md:mr-4'>
					<DropdownMenuLabel>
						Hi, {authUser?.firstName}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<button
							className='p-1 rounded-md hover:bg-accent w-full justify-start'
							onClick={(e) => {
								e.stopPropagation();
							}}>
							<UserProfile />
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button
							size='sm'
							className='w-full rounded-none bg-pry hover:bg-accent hover:text-pry text-left'
							onClick={(e) => {
								e.preventDefault();
								logout();
							}}>
							Logout
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
