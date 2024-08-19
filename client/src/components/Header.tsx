import { Link } from "react-router-dom";
import MobileNav from "./MainNav";
import MainNav from "./MainNav";

const Header = () => {
	return (
		<main className='border-b px-2 md:px-6 bg-white'>
			<div className='flex justify-between items-center mx-auto p-3 md:p-4'>
				<Link to='/' className='text-h2 flex font-bold text-h1 font-rubik'>
					<p className='text-pry'>AppoSwift</p>
				</Link>

				<div className='md:hidden'>
					<MobileNav />
				</div>
				<div className='hidden md:block'>
					<MainNav />
				</div>
			</div>
		</main>
	);
};

export default Header;
