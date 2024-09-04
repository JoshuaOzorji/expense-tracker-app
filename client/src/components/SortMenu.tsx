import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SortMenuProps {
	onSortFieldChange: (value: string) => void;
}

const SortMenu = ({ onSortFieldChange }: SortMenuProps) => {
	const [selectedValue, setSelectedValue] = useState("");

	const handleValueChange = (value: string) => {
		setSelectedValue(value);
		onSortFieldChange(value);
	};

	return (
		<Select onValueChange={handleValueChange}>
			<SelectTrigger className='w-full gap-x-1 outline-none'>
				<SelectValue placeholder='Sort by'>
					{selectedValue || "Sort by"}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value='category'>
						Category
					</SelectItem>
					<SelectItem value='amount'>
						Amount
					</SelectItem>
					<SelectItem value='paymentType'>
						Payment Type
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SortMenu;
