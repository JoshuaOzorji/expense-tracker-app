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

const UserMenu = () => {
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<img
						src={userImg}
						alt=''
						className='rounded-full object-cover outline-none hover:outline-none h-8 w-8'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mr-3 md:mr-4'>
					<DropdownMenuLabel>Hi, [FirstName]</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<button className='hover:bg-accent p-1 rounded-md'>
							Update Profile
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button
							size='sm'
							className='w-full bg-pry hover:bg-sec hover:text-pry rounded-none'>
							Logout
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
