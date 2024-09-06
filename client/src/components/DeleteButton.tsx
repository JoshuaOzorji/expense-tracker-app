import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteTransaction } from "@/hooks/TransactionApi";
import { PiTrashLight } from "react-icons/pi";

interface DeleteButtonProps {
	transactionId: string;
}

const DeleteButton = ({ transactionId }: DeleteButtonProps) => {
	const { deleteTransaction, isPending } = useDeleteTransaction();

	// const [open, setOpen] = useState(false);

	const handleDelete = () => {
		deleteTransaction(transactionId);
		// setOpen(false);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<button className='text-red-700 hover:underline animate hover:bg-red-300 rounded-full p-1'>
					<PiTrashLight />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Delete Transaction?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete
						this transaction.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className='bg-pry '
						onClick={handleDelete}
						disabled={isPending}>
						{isPending
							? "Deleting..."
							: "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteButton;
