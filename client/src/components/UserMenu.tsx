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
						className='object-cover w-8 h-8 rounded-full outline-none hover:outline-none'
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
							className='w-full rounded-none bg-pry hover:bg-sec hover:text-pry'>
							Logout
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
