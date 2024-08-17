import { IconType } from "react-icons";

interface InputFieldProps {
	label: string;
	type: string;
	name: string;
	placeholder: string;
	Icon?: IconType;
}

export const InputField = ({
	label,
	type,
	name,
	placeholder,
	Icon,
}: InputFieldProps) => {
	return (
		<label htmlFor={name}>
			{label}

			<div className='label'>
				{Icon && <Icon className='icon text-pry' />}

				<input
					type={type}
					placeholder={placeholder}
					name={name}
					className='flex-grow outline-none bg-accent font-extralight'
				/>
			</div>
		</label>
	);
};

interface GenderFieldProps {
	label: string;
	name: string;
}

export const GenderField = ({ label, name }: GenderFieldProps) => {
	return (
		<main>
			<label>{label}</label>
			<div className='flex space-x-4'>
				<label className='flex items-center'>
					<input
						type='radio'
						name={name}
						value='male'
						className='mr-2'
						required
					/>
					Male
				</label>
				<label className='flex items-center'>
					<input
						type='radio'
						name={name}
						value='female'
						className='mr-2'
						required
					/>
					Female
				</label>
			</div>
		</main>
	);
};
