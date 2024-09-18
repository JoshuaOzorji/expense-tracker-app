import { Link } from "react-router-dom";
import logo from "/logo.png";
import UserMenu from "./UserMenu";

const Header = () => {
	return (
		<main className='px-2 bg-white border-b md:px-6 w-full'>
			<div className='flex items-center justify-between p-2 mx-auto md:p-3 font-dmSans'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='object-contain'
					/>
				</Link>

				<div>
					<UserMenu />
				</div>
			</div>
		</main>
	);
};

export default Header;
