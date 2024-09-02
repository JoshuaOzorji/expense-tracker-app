import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SortMenuProps {
	onSortFieldChange: (value: string) => void;
}

const SortMenu = ({ onSortFieldChange }: SortMenuProps) => {
	return (
		<Select onValueChange={onSortFieldChange}>
			<SelectTrigger className='w-full gap-x-1 outline-none'>
				<SelectValue placeholder='Sort by' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='category'>Category</SelectItem>
					<SelectItem value='amount'>Amount</SelectItem>
					<SelectItem value='paymentType'>Payment Type</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SortMenu;
