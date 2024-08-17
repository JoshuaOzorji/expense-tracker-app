import loginImage from "/expense-register.png";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";

const LoginPage = () => {
	return (
		<main className='flex flex-col min-h-screen md:flex-row'>
			<section className='hidden md:block md:w-[40%] bg-accent mx-auto min-h-screen justify-center'>
				<div>
					<img src={loginImage} alt='login image' className='object-contain ' />
				</div>

				<div className='flex flex-col items-center '>
					<h3 className='font-bold text-h2 font-bitter'>Welcome back</h3>
					<p className='mb-6 text-sm'>
						Start managing your finance faster and better
					</p>
				</div>
			</section>

			<section className='md:w-[60%] flex flex-col justify-center min-h-screen'>
				<div className='block w-[80%] md:w-[50%] mx-auto space-y-4'>
					<div>
						<h2 className='font-bold text-h2 font-bitter'>Login</h2>
						<p className='font-light text-sec'>
							Input your details to continue
						</p>
					</div>

					<form className='space-y-4'>
						<label htmlFor='identifier' className='label'>
							<CiUser className='icon text-pry' />
							<input
								type='text'
								placeholder='email or username'
								name='identifier'
								className='flex-grow outline-none bg-accent font-extralight'
							/>
						</label>

						<label htmlFor='password' className='label'>
							<CiLock className='icon text-pry' />
							<input
								type='password'
								placeholder='password'
								name='password'
								className='flex-grow outline-none bg-accent font-extralight'
							/>
						</label>

						<div className='text-h4 text-pry'>
							<p className=''>Forgot password?</p>
						</div>

						<button className='button'>
							<p>Login</p>
						</button>
					</form>

					<div className='flex justify-center gap-2 pt-6 text-h4'>
						<p className='text-sec'>Don't have an account?</p>{" "}
						<Link className='text-pry hover:underline' to={"/signup"}>
							Sign Up
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default LoginPage;
