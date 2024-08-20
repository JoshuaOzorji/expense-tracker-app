import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
	return (
		<main className='animate flex flex-col min-h-screen'>
			<Header />

			<div className='flex-1 font-dmSans'>
				<Outlet />
			</div>

			<Footer />
		</main>
	);
};

export default Layout;
