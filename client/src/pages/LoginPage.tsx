import { useAuthUser, useLogin } from "@/hooks/AuthApi";
import loginImage from "/expense-register.png";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import brandLogo from "/mrjosh-logo.png";

const LoginPage = () => {
	const { authUser } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (authUser) {
			navigate("/dashboard");
		}
	}, [authUser, navigate]);

	const { loginMutation, isPending, isError, error } = useLogin();

	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginMutation(formData);
	};

	return (
		<main className='flex flex-col min-h-screen md:flex-row'>
			<section className='hidden md:block md:w-[40%] bg-accent mx-auto min-h-screen justify-center'>
				<div>
					<img
						src={loginImage}
						alt='login image'
						className='object-contain '
					/>
				</div>

				<div className='flex flex-col items-center '>
					<h3 className='font-bold text-h2 font-bitter'>
						Welcome back
					</h3>
					<p className='mb-6 text-sm'>
						Start managing your finance
						faster and better
					</p>
				</div>
			</section>

			<section className='md:w-[60%] flex flex-col justify-center min-h-screen'>
				<div className='block w-[80%] md:w-[50%] mx-auto space-y-4'>
					<Link
						to='/login'
						className='flex flex-col items-center'>
						<img
							src={brandLogo}
							alt='Brand Logo'
							className='object-contain w-12 h-12 md:h-16 md:w-16'
						/>
					</Link>
					<div className=''>
						<h2 className='font-bold text-h2 font-bitter'>
							Login
						</h2>
						<p className='font-light text-sec'>
							Input your details to
							continue
						</p>
					</div>

					<form
						className='space-y-4'
						onSubmit={handleSubmit}>
						<div>
							<label htmlFor='username'>
								Email or
								Username
							</label>
							<div className='label'>
								<CiUser className='icon text-pry' />
								<input
									type='text'
									name='identifier'
									placeholder='email or username'
									className='custom-input'
									onChange={
										handleInputChange
									}
									value={
										formData.identifier
									}
								/>
							</div>
						</div>

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

						<div className='text-h4 text-pry'>
							<p className=''>
								Forgot password?
							</p>
						</div>

						<button className='button'>
							<p>
								{isPending
									? "Loading..."
									: "Login"}
							</p>
						</button>

						{isError && error && (
							<p className='text-sm font-light text-center bg-red-600 rounded-md text-accent'>
								{error.message}
							</p>
						)}
					</form>

					<div className='flex justify-center gap-2 pt-6 text-h4'>
						<p className='text-sec'>
							Don't have an account?
						</p>{" "}
						<Link
							className='text-pry hover:underline'
							to={"/signup"}>
							Sign Up
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default LoginPage;
