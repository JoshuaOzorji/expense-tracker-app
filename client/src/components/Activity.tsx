const Activity = () => {
	return (
		<main className='p-2 my-4 border rounded-md shadow-md shadow-accent w-full md:w-[75%] mx-auto'>
			<header className='flex items-center justify-between px-4 py-1 border my-2'>
				<p>Recent Activities</p>

				<div className='md:space-x-14'>
					<button className='buttonSm'>Add +</button>
					<span>Filter</span>
				</div>
			</header>

			<section className='flex justify-between border rounded-md md:p-3'>
				<div className='flex flex-col md:w-[70%] text-left'>
					<span className='font-bold md:text-xl'>Investment</span>
					<span className='text-sm'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
						mollitia, molestiae quas vel sint commodi repudiandae consequuntur
						voluptatum laborum numquam blanditiis harum
					</span>
				</div>

				<div className='flex flex-col md:w-[30%] text-right'>
					<span className='md:text-xl font-bold'>$40</span>
					<span className='text-sm'>21-Aug-24</span>
				</div>
			</section>
		</main>
	);
};

export default Activity;
