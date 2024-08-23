import { Link } from "react-router-dom";
import FilterMenu from "./FilterMenu";

const Activity = () => {
	return (
		<main className='p-2 my-4 border rounded-md shadow-md shadow-accent w-full md:w-[75%] mx-auto '>
			<header className='flex items-center justify-between px-4 py-1 my-2 border border-sec'>
				<p>Recent Activities</p>

				<div className='flex gap-3'>
					<button className='buttonSm whitespace-nowrap'>Add +</button>
					<FilterMenu />
				</div>
			</header>

			<Link
				to='/update'
				className='flex justify-between border rounded-md md:p-3 border-sec'>
				<div className='flex flex-col md:w-[70%] text-left'>
					<span className='font-bold md:text-xl'>Investment</span>
					<span className='text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
						mollitia, molestiae quas vel sint commodi repudiandae consequuntur
						voluptatum laborum numquam blanditiis harum
					</span>
				</div>

				<div className='flex flex-col md:w-[30%] text-right'>
					<span className='font-bold md:text-xl'>$40</span>
					<span className='text-sm'>21-Aug-24</span>
				</div>
			</Link>
		</main>
	);
};

export default Activity;
