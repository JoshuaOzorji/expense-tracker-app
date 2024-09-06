import { useGetTransaction } from "@/hooks/TransactionApi";
import { CiEdit } from "react-icons/ci";
import DeleteButton from "./DeleteButton";

interface CardProps {
	transactionId: string;
}

const Card = ({ transactionId }: CardProps) => {
	const { transaction, isLoading, isError } =
		useGetTransaction(transactionId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError || !transaction) {
		return <div>Error fetching transaction</div>;
	}

	return (
		<section className='flex justify-between border rounded-md md:p-3 border-sec hover:shadow-md animate p-2'>
			<div className='flex flex-col  text-left'>
				<span className='font-bold md:text-base capitalize'>
					{transaction?.description}
				</span>
				<span className='text-sm capitalize'>
					{transaction?.category}
				</span>
			</div>

			<section className='flex text-right gap-4 md:gap-5 items-center'>
				<div className='flex flex-col'>
					<span className='font-bold md:text-xl'>
						₦{transaction?.amount}
					</span>
					<span className='text-sm'>
						{transaction?.formattedDate}
					</span>
				</div>

				<div className='flex flex-col gap-1'>
					<button className='hover:underline animate hover:bg-accent rounded-full p-1'>
						<CiEdit />
					</button>

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
