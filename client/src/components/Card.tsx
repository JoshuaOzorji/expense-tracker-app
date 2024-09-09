import { useGetTransaction } from "@/hooks/TransactionApi";
import { CiEdit } from "react-icons/ci";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import TransactionForm from "./TransactionForm";
import LoadingSpinner from "./LoadingSpinner";

interface CardProps {
	transactionId: string;
}

const Card = ({ transactionId }: CardProps) => {
	const { transaction, isLoading, isError } =
		useGetTransaction(transactionId);

	const [isEditOpen, setIsEditOpen] = useState(false);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-fit'>
				<LoadingSpinner size='sm' />
			</div>
		);
	}

	if (isError || !transaction) {
		return (
			<div className='flex items-center justify-center h-fit text-center'>
				Error loading data
			</div>
		);
	}

	return (
		<section className='flex justify-between border rounded-md md:p-3 border-sec hover:shadow-md animate p-2'>
			<div className='flex flex-col justify-between'>
				<span className='font-bold md:text-base capitalize'>
					{transaction?.description}
				</span>
				<span className='text-sm capitalize'>
					{transaction?.category}
				</span>
			</div>

			<section className='flex text-right gap-4 md:gap-5 items-center'>
				<div className='flex flex-col justify-between'>
					<span className='font-bold md:text-xl'>
						₦{transaction?.amount}
					</span>
					<span className='text-sm'>
						{transaction?.formattedDate}
					</span>
				</div>

				<div className='flex flex-col gap-1'>
					<button
						className='hover:bg-accent p-1 rounded-full'
						onClick={() =>
							setIsEditOpen(true)
						}>
						<CiEdit />
					</button>

					{isEditOpen && (
						<TransactionForm
							initialData={{
								id: transaction._id,
								description:
									transaction.description,
								paymentType:
									transaction.paymentType,
								category: transaction.category,
								amount: transaction.amount,
								location:
									transaction.location ||
									"",
								date: new Date(
									transaction.date,
								),
							}}
							isUpdate={true}
							onClose={() =>
								setIsEditOpen(
									false,
								)
							}
							isOpen={isEditOpen}
						/>
					)}

					{transaction._id && (
						<DeleteButton
							transactionId={
								transaction._id
							}
						/>
					)}
				</div>
			</section>
		</section>
	);
};

export default Card;
