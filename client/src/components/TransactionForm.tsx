import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DateInputField, InputField, SelectField } from "./InputFields";
import {
	useCreateTransaction,
	useUpdateTransaction,
} from "@/hooks/TransactionApi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface TransactionFormProps {
	initialData?: {
		id: string;
		description: string;
		paymentType: string;
		category: string;
		amount: number;
		location: string;
		date: Date;
	};
	isUpdate?: boolean;
	onClose?: () => void;
	isOpen?: boolean;
	onSuccess?: () => void;
}

const TransactionForm = ({
	initialData,
	isUpdate = false,
	onClose,
	isOpen = false,
}: TransactionFormProps) => {
	const {
		createTransaction,
		isPending: createPending,
		isError: createError,
		error: createErrorObj,
	} = useCreateTransaction();

	const {
		updateTransaction,
		isPending: updatePending,
		isError: updateError,
		error: updateErrorObj,
	} = useUpdateTransaction();

	const [formData, setFormData] = useState({
		paymentType: "",
		category: "",
		amount: 0,
		location: "",
		date: new Date(),
		description: "",
	});

	const [dialogOpen, setDialogOpen] = useState(isOpen);

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numericValue =
			parseFloat(e.target.value.replace(/,/g, "")) || 0;
		setFormData((prevData) => ({
			...prevData,
			amount: numericValue,
		}));
	};

	const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			date: new Date(e.target.value),
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isUpdate && initialData) {
			updateTransaction({
				id: initialData.id,
				data: formData,
			});
		} else {
			createTransaction(formData);
		}

		if (onClose) onClose();
		setDialogOpen(false);
	};

	return (
		<>
			{!isUpdate && (
				<Button
					variant='outline'
					className='buttonSm'
					onClick={() => setDialogOpen(true)}>
					Add +
				</Button>
			)}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{isUpdate
								? "Update Transaction"
								: "Add Transaction"}
						</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={handleSubmit}
						className='grid gap-2 py-4'>
						<div className='flex items-center justify-between gap-2'>
							<span className='w-full'>
								<SelectField
									label='Payment Type'
									id='paymentType'
									name='paymentType'
									options={[
										"transfer",
										"cash",
										"card",
									]}
									onChange={
										handleInputChange
									}
									value={
										formData.paymentType
									}
								/>
							</span>

							<span className='w-full'>
								<SelectField
									label='Category'
									id='category'
									name='category'
									options={[
										"investments",
										"savings",
										"essentials",
										"discretionary",
									]}
									onChange={
										handleInputChange
									}
									value={
										formData.category
									}
								/>
							</span>
						</div>

						<div className='flex justify-between gap-2'>
							<span className='w-full'>
								<InputField
									label='Amount (₦)'
									id='amount'
									type='text'
									name='amount'
									placeholder='amount'
									onChange={
										handleAmountChange
									}
									value={Number(
										formData.amount,
									).toLocaleString()}
								/>
							</span>

							<span className='w-full'>
								<InputField
									label='Location'
									id='location'
									type='text'
									name='location'
									placeholder='location'
									onChange={
										handleInputChange
									}
									value={
										formData.location
									}
								/>
							</span>
						</div>

						<DateInputField
							label='Date'
							id='date'
							name='date'
							onChange={
								handleDateChange
							}
							value={formData.date
								.toISOString()
								.substring(
									0,
									10,
								)}
						/>

						<InputField
							id='description'
							label='Description'
							type='text'
							name='description'
							placeholder='description'
							onChange={
								handleInputChange
							}
							value={
								formData.description
							}
						/>

						{(createError ||
							updateError) && (
							<p className='text-sm font-light text-center text-red-600 rounded-md'>
								{(createError &&
									createErrorObj?.message) ||
									(updateError &&
										updateErrorObj?.message)}
							</p>
						)}

						<DialogFooter>
							<button
								type='submit'
								className='buttonSm'>
								<p>
									{isUpdate
										? updatePending
											? "Updating..."
											: "Update Transaction"
										: createPending
										? "Loading..."
										: "Add Transaction"}
								</p>
							</button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TransactionForm;
