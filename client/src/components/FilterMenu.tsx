import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const FilterMenu = () => {
	return (
		<Select>
			<SelectTrigger className='w-full gap-x-1 outline-none'>
				<SelectValue placeholder='Sort by' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='category'>Category</SelectItem>
					<SelectItem value='amount'>Amount</SelectItem>
					<SelectItem value='date'>Date</SelectItem>
					<SelectItem value='paymentType'>Payment Type</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FilterMenu;
