import FilterMenu from "./FilterMenu";
import AddTransaction from "./TransactionForm";
import Cards from "./Cards";

const Activity = () => {
	return (
		<main className='p-2 my-4 border rounded-md shadow-md shadow-accent w-full md:w-[75%] mx-auto '>
			<header className='flex items-center justify-between px-4 py-1 my-2 border border-sec'>
				<p>Recent Activities</p>

				<div className='flex gap-3'>
					<AddTransaction />
					<FilterMenu />
				</div>
			</header>

			<Cards />
		</main>
	);
};

export default Activity;
