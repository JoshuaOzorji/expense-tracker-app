import { IconType } from "react-icons";

interface InputFieldProps {
	id: string;
	label: string;
	type: string;
	name: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
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
		<label htmlFor={name}>
			{label}

			<div className='label'>
				{Icon && <Icon className='icon text-pry' />}

				<input
					id={id}
					type={type}
					placeholder={placeholder}
					name={name}
					className='flex-grow outline-none bg-accent font-extralight'
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
	defaultValue?: string;
}

export const SelectField = ({
	id,
	label,
	name,
	options,
	Icon,
	defaultValue = "gender", // default to "gender"
}: SelectFieldProps) => {
	return (
		<label htmlFor={name}>
			{label}
			<div className='label'>
				{Icon && <Icon className='icon text-pry' />}
				<select
					id={id}
					name={name}
					defaultValue={defaultValue}
					className='flex-grow outline-none bg-accent font-extralight'>
					<option value='gender' disabled>
						Select
					</option>
					{options.map((option) => (
						<option key={option} value={option}>
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
	Icon?: IconType;
}

export const DateInputField = ({
	id,
	label,
	name,
	placeholder = "Select a date",
	Icon,
}: DateInputFieldProps) => {
	return (
		<label htmlFor={name}>
			{label}
			<div className='label'>
				{Icon && <Icon className='icon text-pry' />}
				<input
					id={id}
					type='date'
					name={name}
					placeholder={placeholder}
					className='flex-grow outline-none bg-accent font-extralight'
				/>
			</div>
		</label>
	);
};
