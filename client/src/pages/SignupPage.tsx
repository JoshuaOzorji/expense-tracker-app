import { CiLock, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "/expense.png";
import { CiMail } from "react-icons/ci";
import brandLogo from "/mrjosh-logo.png";
import { PiUserPlusLight } from "react-icons/pi";
import { useAuthUser, useSignUp } from "@/hooks/AuthApi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignupPage = () => {
	const { signUp, isError, isPending, error } = useSignUp();

	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
		email: "",
		gender: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signUp(formData);
	};

	const { authUser } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (authUser) {
			navigate("/dashboard");
		}
	}, [authUser, navigate]);

	return (
		<main className='flex flex-col min-h-screen md:flex-row md:relative'>
			<section className='md:w-[60%] flex flex-col justify-center min-h-screen'>
				<div className='block w-[80%] md:w-[50%] mx-auto space-y-4 my-8'>
					<Link
						to='/login'
						className='flex flex-col items-center'>
						<img
							src={brandLogo}
							alt='Brand Logo'
							className='object-contain w-12 h-12 md:h-16 md:w-16'
						/>
					</Link>
					<div>
						<h2 className='font-bold text-h2 font-bitter'>
							Sign Up
						</h2>
						<p className='font-light text-sec'>
							Please input your
							details to sign up
						</p>
					</div>

					<form
						className='flex flex-col gap-3'
						onSubmit={handleSubmit}
						autoComplete='off'>
						{/* FIRST NAME */}
						<div>
							<label htmlFor='firstName'>
								First name
							</label>
							<div className='label'>
								<CiUser className='icon text-pry' />
								<input
									type='text'
									name='firstName'
									placeholder='first name'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.firstName
									}
								/>
							</div>
						</div>

						{/* LAST NAME */}
						<div>
							<label htmlFor='Last Name'>
								Last Name
							</label>
							<div className='label'>
								<CiUser className='icon text-pry' />
								<input
									type='text'
									name='lastName'
									placeholder='last name'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.lastName
									}
								/>
							</div>
						</div>

						{/* USERNAME */}
						<div>
							<label htmlFor='username'>
								Username
							</label>
							<div className='label'>
								<PiUserPlusLight className='icon text-pry' />
								<input
									type='text'
									name='username'
									placeholder='username'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.username
									}
								/>
							</div>
						</div>

						{/* GENDER */}
						<div>
							<label>Gender</label>
							<div className='flex space-x-4'>
								<label className='flex items-center'>
									<input
										type='radio'
										name='gender'
										value='male'
										onChange={
											handleInputChange
										}
										checked={
											formData.gender ===
											"male"
										}
										required
										className='mr-2 radio radio-error'
									/>
									Male
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='gender'
										value='female'
										onChange={
											handleInputChange
										}
										checked={
											formData.gender ===
											"female"
										}
										required
										className='mr-2 radio radio-error'
									/>
									Female
								</label>
							</div>
						</div>

						{/* EMAIL */}
						<div>
							<label htmlFor='email'>
								Email
							</label>
							<div className='label'>
								<CiMail className='icon text-pry' />
								<input
									type='email'
									name='email'
									placeholder='email address'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.email
									}
								/>
							</div>
						</div>

						{/* PASSWORD */}
						<div>
							<label htmlFor='password'>
								Password
							</label>
							<div className='label'>
								<CiLock className='icon text-pry' />
								<input
									type='password'
									name='password'
									placeholder='password'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.password
									}
								/>
							</div>
						</div>

						{/* CONFIRM PASSWORD */}
						<div>
							<label htmlFor='confirmPassword'>
								Confirm Password
							</label>
							<div className='label'>
								<CiLock className='icon text-pry' />
								<input
									type='password'
									name='confirmPassword'
									placeholder='confirm password'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.confirmPassword
									}
								/>
							</div>
						</div>

						{/* SUBMIT BUTTON */}
						<button className='button'>
							<p>
								{isPending ? (
									<LoadingSpinner size='xs' />
								) : (
									<p>
										Sign
										Up
									</p>
								)}
							</p>
						</button>
						{isError && error && (
							<p className='text-sm font-light text-center text-red-600 rounded-md'>
								{error.message}
							</p>
						)}
					</form>

					<div className='flex justify-center gap-2 pt-6 text-h4'>
						<p className='text-sec'>
							Already have an account
						</p>{" "}
						<Link
							className='text-pry hover:underline'
							to={"/"}>
							Log in
						</Link>
					</div>
				</div>
			</section>

			<section className='hidden md:block md:w-[40%] bg-accent mx-auto min-h-screen justify-center md:fixed right-0 top-0'>
				<div className=''>
					<img
						src={signupImage}
						alt='login image'
						className='object-contain'
					/>
				</div>
			</section>
		</main>
	);
};

export default SignupPage;
