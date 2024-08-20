import { Link } from "react-router-dom";
import logo from "/logo.png";
import UserMenu from "./UserMenu";

const Header = () => {
	return (
		<main className='border-b px-2 md:px-6 bg-white'>
			<div className='flex justify-between items-center mx-auto p-2 md:p-3 font-dmSans'>
				<Link to='/'>
					<img src={logo} alt='logo' className='object-contain' />
				</Link>

				<div>
					<UserMenu />
				</div>
			</div>
		</main>
	);
};

export default Header;
