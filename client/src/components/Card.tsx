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
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<Link
			to='/update'
			className='flex justify-between border rounded-md md:p-3 border-sec'>
			<div className='flex flex-col md:w-[70%] text-left'>
				<span className='font-bold md:text-xl'>{transaction?.category}</span>
				<span className='text-sm'>{transaction?.description}</span>
			</div>

			<div className='flex flex-col md:w-[30%] text-right'>
				<span className='font-bold md:text-xl'>#{transaction?.amount}</span>
				<span className='text-sm'>21-Aug-24</span>
			</div>
		</Link>
	);
};

export default Card;
