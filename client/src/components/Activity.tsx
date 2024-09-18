import { useGetTransactions } from "@/hooks/TransactionApi";
import Card from "./Card";
import SortMenu from "./SortMenu";
import AddTransaction from "./TransactionForm";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

const Activity = () => {
	const [sortField, setSortField] = useState<string | undefined>();
	const { transactions, isLoading, isError } = useGetTransactions({
		sortField,
	});

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

	return (
		<main className='p-2 my-8 border rounded-md shadow-md shadow-accent w-full md:w-[75%] mx-auto max-w-full'>
			<header className='flex items-center justify-between p-2 my-2 border border-sec'>
				<p className='text-xs md:text-base'>
					Recent Activities
				</p>

				<div className='flex gap-3'>
					<AddTransaction />
					<SortMenu
						onSortFieldChange={setSortField}
					/>
				</div>
			</header>

			{transactions && transactions.length > 0 ? (
				transactions.map((transaction) => (
					<div className='my-2'>
						<Card
							key={transaction._id}
							transactionId={
								transaction._id
							}
						/>
					</div>
				))
			) : (
				<p className='p-2 text-center'>
					No transactions found
				</p>
			)}
		</main>
	);
};

export default Activity;
