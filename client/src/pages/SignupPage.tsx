import { CiLock, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import signupImage from "/expense.png";

const SignupPage = () => {
	return (
		<main className='flex flex-col min-h-screen md:flex-row'>
			<section className='md:w-[60%] flex flex-col justify-center min-h-screen'>
				<div className='block w-[80%] md:w-[50%] mx-auto space-y-4'>
					<div>
						<h2 className='font-bold text-h2 font-bitter'>Sign Up</h2>
						<p className='font-light text-sec'>
							Input your details to continue
						</p>
					</div>

					<form className='space-y-4'>
						<label htmlFor='firstName' className='label'>
							First Name
							<CiUser className='icon text-pry' />
							<input
								type='text'
								name='firstName'
								className='flex-grow outline-none bg-accent font-extralight'
							/>
						</label>

						<label htmlFor='lastName' className='label'>
							Last Name
							<CiUser className='icon text-pry' />
							<input
								type='text'
								name='lastName'
								className='flex-grow outline-none bg-accent font-extralight'
							/>
						</label>

						<label htmlFor='password' className='label'>
							<CiLock className='icon text-pry' />
							<input
								type='text'
								placeholder='password'
								name='password'
								className='flex-grow outline-none bg-accent font-extralight'
							/>
						</label>

						<button className='button'>
							<p>Sign Up</p>
						</button>
					</form>

					<div className='flex justify-center gap-2 pt-6 text-h4'>
						<p className='text-sec'>Already have an account</p>{" "}
						<Link className='text-pry' to={"/login"}>
							Log in
						</Link>
					</div>
				</div>
			</section>
			<section className='hidden md:block md:w-[40%] bg-accent mx-auto min-h-screen justify-center'>
				<div>
					<img
						src={signupImage}
						alt='login image'
						className='object-contain '
					/>
				</div>
			</section>
		</main>
	);
};

export default SignupPage;
