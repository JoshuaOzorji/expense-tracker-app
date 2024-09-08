import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TransactionForm from "./TransactionForm";
import GreetingCard from "./GreetingCard";
import { useCategoryStatistics } from "@/hooks/TransactionApi";
import { useMemo } from "react";
import LoadingSpinner from "./LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
	const { statistics, isLoading, isError } = useCategoryStatistics();

	const chartData = useMemo(() => {
		if (statistics) {
			return {
				labels: statistics.map((stat) => stat.category),
				datasets: [
					{
						data: statistics.map(
							(stat) =>
								stat.totalAmount,
						),
						label: "₦",
						backgroundColor: [
							"#03071e",
							"#6a040f",
							"#b23a48",
							"#fcb9b2",
						],
						borderColor: [
							"#03071e",
							"#6a040f",
							"#b23a48",
							"#fcb9b2",
						],
						borderWidth: 1,
						borderRadius: 3,
						spacing: 5,
						cutout: 130,
					},
				],
			};
		}
		return null;
	}, [statistics]);

	const options = {
		plugins: {
			legend: {
				display: true,
				position: "bottom" as const,
				labels: {
					boxWidth: 12,
					padding: 20,
				},
			},
		},
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	if (isError) {
		return (
			<div className='flex items-center justify-center h-screen text-center'>
				Error loading data
			</div>
		);
	}

	const getTotalSpend = () =>
		statistics?.reduce((acc, stat) => acc + stat.totalAmount, 0) ??
		0;

	return (
		<main className='p-2 border rounded-md shadow-md '>
			<div className='flex items-center justify-between'>
				<p className='p-2'>
					<GreetingCard />
				</p>
				<TransactionForm />
			</div>

			<div className='flex flex-col items-center max-h-screen gap-4 md:flex-row shadow-accent'>
				<section className='md:w-[50%]'>
					{/* CHART */}
					<div className='flex justify-center items-center w-full h-auto mx-auto md:max-h-[75vh]'>
						{chartData ? (
							<Doughnut
								data={chartData}
								options={
									options
								}
							/>
						) : (
							<div>
								No data
								available
							</div>
						)}
					</div>
				</section>

				<section className='w-full md:w-[50%] p-2 flex flex-col gap-3'>
					{statistics?.map((stat, index) => (
						<div
							key={stat.category}
							className={`flex justify-between items-center space-x-8 border border-[#${
								[
									"03071e",
									"6a040f",
									"b23a48",
									"fcb9b2",
								][index % 4]
							}] rounded-md text-[#${
								[
									"03071e",
									"6a040f",
									"b23a48",
									"fcb9b2",
								][index % 4]
							}] py-1 px-2`}>
							<span className='flex flex-col'>
								<h2 className='text-2xl font-bold capitalize'>
									{
										stat.category
									}
								</h2>
								<p className='font-extralight text-[12px]'>
									{/* Add a description for each category as needed */}
								</p>
							</span>
							<span className='text-4xl font-bold'>
								₦
								{
									stat.totalAmount
								}
							</span>
						</div>
					))}

					<div className='flex items-center justify-between my-1 font-bold text-black px-2'>
						<h2 className='text-2xl'>
							Total spend
						</h2>
						<h1 className='text-4xl'>
							₦{getTotalSpend()}
						</h1>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Dashboard;
