import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TransactionForm from "./TransactionForm";
import GreetingCard from "./GreetingCard";
import { useCategoryStatistics } from "@/hooks/TransactionApi";
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
	const { statistics, isLoading, isError } = useCategoryStatistics();

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
		responsive: true,
		plugins: {
			legend: {
				display: !isMobile,
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
		<main className='max-w-full p-2 border rounded-md shadow-md'>
			<div className='flex items-center justify-between p-1'>
				<p>
					<GreetingCard />
				</p>
				<TransactionForm />
			</div>

			<div className='flex flex-col items-center gap-4 md:flex-row shadow-accent'>
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
								<h2 className='font-bold capitalize text-h3'>
									{
										stat.category
									}
								</h2>
								<p className='font-extralight text-[12px]'>
									{/* TODO: */}
									{/* Add a description for each category as needed */}
								</p>
							</span>
							<span className='font-bold text-h3'>
								₦
								{stat.totalAmount.toLocaleString(
									undefined,
									{
										minimumFractionDigits: 2,
									},
								)}
							</span>
						</div>
					))}

					<div className='flex items-center justify-between px-2 py-1 my-1 text-xl font-bold text-black rounded-md bg-accent md:text-2xl'>
						<h2>Total spend</h2>
						{/* <h1>₦{getTotalSpend()}</h1> */}
						<h1>
							₦
							{getTotalSpend().toLocaleString(
								undefined,
								{
									minimumFractionDigits: 2,
								},
							)}
						</h1>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Dashboard;
