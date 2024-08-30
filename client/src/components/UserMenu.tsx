import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import userImg from "/mrjosh.png";
import { useLogout } from "@/hooks/AuthApi";

const UserMenu = () => {
	const { logout } = useLogout();

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
					<DropdownMenuLabel>Hi, [FirstName]</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<button className='p-1 rounded-md hover:bg-accent'>
							Update Profile
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button
							size='sm'
							className='w-full rounded-none bg-pry hover:bg-sec hover:text-pry'
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
