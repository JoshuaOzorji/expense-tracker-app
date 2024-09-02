import { useGetTransaction } from "@/hooks/TransactionApi";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

interface CardProps {
	transactionId: string;
}

const Card = ({ transactionId }: CardProps) => {
	const { transaction, isLoading } = useGetTransaction(transactionId);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<Link
			to='/update'
			className='flex justify-between border rounded-md md:p-3 border-sec hover:shadow-md animate'>
			<div className='flex flex-col md:w-[70%] text-left'>
				<span className='font-bold md:text-base capitalize'>
					{transaction?.description}
				</span>
				<span className='text-sm capitalize'>{transaction?.category}</span>
			</div>

			<div className='flex flex-col md:w-[30%] text-right'>
				<span className='font-bold md:text-xl'>₦{transaction?.amount}</span>
				<span className='text-sm'>{transaction?.date}</span>
			</div>
		</Link>
	);
};

export default Card;
