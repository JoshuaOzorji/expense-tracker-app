import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const chartData = {
	labels: ["Investments", "Savings", "Essentials", "Discretionary"],
	datasets: [
		{
			data: [5, 11, 9, 15],
			label: "%",
			backgroundColor: ["#03071e", "#6a040f", "#b23a48", "#fcb9b2"],
			borderColor: ["#03071e", "#6a040f", "#b23a48", "#fcb9b2"],
			borderWidth: 1,
			borderRadius: 3,
			spacing: 5,
			cutout: 130,
		},
	],
};

// const chartOptions = {
// 	responsive: true,
// 	legend: {
// 		position: "bottom",
// 		align: "center",
// 	},
// };
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
	return (
		<main className='flex flex-col max-h-screen p-2 border rounded-md shadow-md md:flex-row shadow-accent'>
			<section className='md:w-[50%]'>
				<p className='p-2'>Good morning, [FIRST_NAME]</p>

				{/* CHART */}
				<div className='flex justify-center items-center w-full h-auto mx-auto md:max-h-[75vh]'>
					<Doughnut data={chartData} />
				</div>
			</section>

			<section className='md:w-[50%] p-2 flex flex-col gap-3'>
				<div className='flex justify-between items-center space-x-8 border border-[#03071e] rounded-md text-[#03071e] py-1 px-2'>
					<span className='flex flex-col'>
						<h2 className='font-bold text-2xl'>Investments</h2>
						<p className='font-extralight text-[10px]'>
							Money put towards future growth or income, such as stocks,
							retirement funds, real estate, and business ventures.
						</p>
					</span>
					<span className='font-bold text-4xl'>$34</span>
				</div>

				<div className='flex justify-between items-center space-x-8 border border-[#fcb9b2] rounded-md text-[#fcb9b2] py-1 px-2'>
					<span className='flex flex-col'>
						<h2 className='font-bold text-2xl'>Discretionary</h2>
						<p className='font-extralight text-[10px]'>
							Non-essential spending, such as recreation, entertainment,
							hobbies, vacations, and gifts.
						</p>
					</span>
					<span className='font-bold text-4xl'>$73</span>
				</div>

				<div className='flex justify-between items-center space-x-8 border border-[#b23a48] rounded-md text-[#b23a48] py-1 px-2'>
					<span className='flex flex-col'>
						<h2 className='font-bold text-2xl'>Essentials</h2>
						<p className='font-extralight text-[10px]'>
							Necessary living expenses like housing, groceries, utilities,
							transportation, insurance, and debt repayment.
						</p>
					</span>
					<span className='font-bold text-4xl'>$32</span>
				</div>

				<div className='flex justify-between items-center space-x-8 border border-[#6a040f] rounded-md text-[#6a040f] py-1 px-2'>
					<span className='flex flex-col'>
						<h2 className='font-bold text-2xl'>Savings</h2>
						<p className='font-extralight text-[10px]'>
							Funds set aside for future use, including emergency funds, savings
							accounts, and long-term goals.
						</p>
					</span>
					<span className='font-bold text-4xl'>$180</span>
				</div>

				<p>Total spend</p>
			</section>
		</main>
	);
};

export default Dashboard;
