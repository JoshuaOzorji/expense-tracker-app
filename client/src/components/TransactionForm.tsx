import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DateInputField, InputField, SelectField } from "./InputFields";
import { useCreateTransaction } from "@/hooks/TransactionApi";
import { ChangeEvent, FormEvent, useState } from "react";

const TransactionForm = () => {
	const { createTransaction, isPending } = useCreateTransaction();

	const [formData, setFormData] = useState({
		paymentType: "",
		category: "",
		amount: 0,
		location: "",
		date: new Date(),
		description: "",
	});

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		const cleanedValue = value.replace(/,/g, "");

		const numericValue = parseFloat(cleanedValue) || 0;

		setFormData((prevData) => ({
			...prevData,
			amount: numericValue,
		}));
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
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
		if (
			!formData.paymentType ||
			!formData.category ||
			!formData.location
		) {
			console.error("All required fields must be filled.");
			return;
		}

		const transactionData = {
			...formData,
		};
		createTransaction(transactionData);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='buttonSm'>
					Add +
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Add transaction
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
									"cash",
									"card",
									"transfer",
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
								placeholder='₦'
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
						onChange={handleDateChange}
						value={formData.date
							.toISOString()
							.substring(0, 10)}
					/>

					<InputField
						id='description'
						label='Description'
						type='text'
						name='description'
						placeholder='description'
						onChange={handleInputChange}
						value={formData.description}
					/>

					<DialogFooter>
						<button
							type='submit'
							className='buttonSm'>
							<p>
								{isPending
									? "Loading..."
									: "Add Transaction"}
							</p>
						</button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TransactionForm;
