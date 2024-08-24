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

const AddTransaction = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='buttonSm'>
					Add +
				</Button>
			</DialogTrigger>
			<DialogContent className=''>
				<DialogHeader>
					<DialogTitle>Add transaction</DialogTitle>
				</DialogHeader>
				<div className='grid gap-2 py-4'>
					<div className='flex items-center justify-between gap-2'>
						<span className='w-full'>
							<SelectField
								label='Payment Type'
								id='paymentType'
								name='paymentType'
								options={["cash", "card", "transfer"]}
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
							/>
						</span>
					</div>

					<div className='flex justify-between gap-2'>
						<span className='w-full'>
							<InputField
								label='Amount'
								id='amount'
								type='number'
								name='amount'
								placeholder='Amount'
							/>
						</span>

						<span className='w-full'>
							<InputField
								label='Location'
								id='location'
								type='text'
								name='location'
								placeholder='location'
							/>
						</span>
					</div>

					<DateInputField label='Date' id='date' name='date' />

					<InputField
						id='description'
						label='Description'
						type='text'
						name='description'
						placeholder='description'
					/>
				</div>
				<DialogFooter>
					<button type='submit' className='buttonSm'>
						Add Transaction
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddTransaction;
