import { useState } from "react";

interface SortMenuProps {
	onSortFieldChange: (value: string) => void;
}

const SortMenu = ({ onSortFieldChange }: SortMenuProps) => {
	const [selectedValue, setSelectedValue] = useState("");

	const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSelectedValue(value);
		onSortFieldChange(value);
	};

	return (
		<div className='flex items-center border px-0.5 rounded-md'>
			<select
				value={selectedValue}
				onChange={handleValueChange}
				className='focus:outline-none'>
				<option value='' disabled>
					Sort by
				</option>
				<option value='category'>Category</option>
				<option value='amount'>Amount</option>
				<option value='paymentType'>
					Payment Type
				</option>
			</select>
		</div>
	);
};

export default SortMenu;
