import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddTransaction from "./AddTransaction";

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
ChartJS.register(ArcElement, Tooltip);

const Dashboard = () => {
	return (
		<main className='p-2 border rounded-md shadow-md '>
			<div className='flex items-center justify-between'>
				<p className='p-2'>Good morning, [FIRST_NAME]</p>
				<AddTransaction />
			</div>

			<div className='flex flex-col items-center max-h-screen gap-3 md:flex-row shadow-accent'>
				<section className='md:w-[50%]'>
					{/* CHART */}
					<div className='flex justify-center items-center w-full h-auto mx-auto md:max-h-[75vh]'>
						<Doughnut data={chartData} />
					</div>
				</section>

				<section className='md:w-[50%] p-2 flex flex-col gap-3'>
					<div className='flex justify-between items-center space-x-8 border border-[#03071e] rounded-md text-[#03071e] py-1 px-2'>
						<span className='flex flex-col'>
							<h2 className='text-2xl font-bold'>Investments</h2>
							<p className='font-extralight text-[12px]'>
								e.g stocks, retirement funds, real estate, and business
								ventures.
							</p>
						</span>
						<span className='text-4xl font-bold'>$34</span>
					</div>

					<div className='flex justify-between items-center space-x-8 border border-[#fcb9b2] rounded-md text-[#fcb9b2] py-1 px-2'>
						<span className='flex flex-col'>
							<h2 className='text-2xl font-bold'>Discretionary</h2>
							<p className='font-extralight text-[12px]'>
								e.g. recreation, entertainment, hobbies, vacations, and gifts.
							</p>
						</span>
						<span className='text-4xl font-bold'>$73</span>
					</div>

					<div className='flex justify-between items-center space-x-8 border border-[#b23a48] rounded-md text-[#b23a48] py-1 px-2'>
						<span className='flex flex-col'>
							<h2 className='text-2xl font-bold'>Essentials</h2>
							<p className='font-extralight text-[12px]'>
								e.g housing, groceries, utilities, transportation, insurance,
								and debt repayment.
							</p>
						</span>
						<span className='text-4xl font-bold'>$32</span>
					</div>

					<div className='flex justify-between items-center space-x-8 border border-[#6a040f] rounded-md text-[#6a040f] py-1 px-2'>
						<span className='flex flex-col'>
							<h2 className='text-2xl font-bold'>Savings</h2>
							<p className='font-extralight text-[12px]'>
								e.g emergency funds, savings accounts, and long-term goals.
							</p>
						</span>
						<span className='text-4xl font-bold'>$180</span>
					</div>

					<div className='flex items-center justify-between my-1 font-bold text-black'>
						<h2 className='text-2xl'>Total spend</h2>

						<h1 className='text-4xl'>$200</h1>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Dashboard;
