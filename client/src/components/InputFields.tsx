import { IconType } from "react-icons";

interface InputFieldProps {
	id: string;
	label: string;
	type: string;
	name: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
	Icon?: IconType;
}

export const InputField = ({
	id,
	label,
	type,
	name,
	placeholder,
	onChange,
	value,
	Icon,
}: InputFieldProps) => {
	return (
		<label htmlFor={name} className='text-h4'>
			{label}

			<div className='label'>
				{Icon && <Icon className='icon text-pry' />}
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					name={name}
					className='outline-none bg-accent font-extralight capitalize flex-grow'
					onChange={onChange}
					value={value}
				/>
			</div>
		</label>
	);
};

interface SelectFieldProps {
	id: string;
	label: string;
	name: string;
	options: string[];
	Icon?: IconType;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value: string;
}

export const SelectField = ({
	id,
	label,
	name,
	options,
	onChange,
	value,
}: SelectFieldProps) => {
	return (
		<label htmlFor={name} className='text-h4'>
			{label}
			<div className='label'>
				<select
					id={id}
					name={name}
					onChange={onChange}
					value={value}
					className='outline-none bg-accent font-extralight capitalize flex-grow'>
					<option disabled>Select</option>
					{options.map((option) => (
						<option
							key={option}
							value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</label>
	);
};

interface DateInputFieldProps {
	id: string;
	label: string;
	name: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export const DateInputField = ({
	id,
	label,
	name,
	onChange,
	value,
	placeholder = "Select date",
}: DateInputFieldProps) => {
	const today = new Date().toISOString().split("T")[0];

	return (
		<label htmlFor={name} className='text-h4'>
			{label}
			<div className='label'>
				<input
					id={id}
					type='date'
					name={name}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					max={today}
					className='outline-none bg-accent font-extralight capitalize flex-grow'
				/>
			</div>
		</label>
	);
};
