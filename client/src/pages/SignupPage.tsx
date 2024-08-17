import { CiLock, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import signupImage from "/expense.png";
import { GenderField, InputField } from "../components/InputField";
import { CiMail } from "react-icons/ci";

import { PiUserPlusLight } from "react-icons/pi";

const SignupPage = () => {
	return (
		<main className='flex flex-col min-h-screen md:flex-row md:relative'>
			<section className='md:w-[60%] flex flex-col justify-center min-h-screen '>
				<div className='block w-[80%] md:w-[50%] mx-auto space-y-4 my-8'>
					<div>
						<h2 className='font-bold text-h2 font-bitter'>Sign Up</h2>
						<p className='font-light text-sec'>
							Please input your details to sign up
						</p>
					</div>

					<form className='space-y-4 flex flex-col'>
						<InputField
							label='First Name'
							type='text'
							name='firstName'
							placeholder='first name'
							Icon={CiUser}
						/>

						<InputField
							label='Last Name'
							type='text'
							name='lastName'
							placeholder='last name'
							Icon={CiUser}
						/>

						<GenderField label='Gender' name='gender' />

						<InputField
							label='Username'
							type='text'
							name='username'
							placeholder='username'
							Icon={PiUserPlusLight}
						/>

						<InputField
							label='Email'
							type='email'
							name='email'
							placeholder='email'
							Icon={CiMail}
						/>

						<InputField
							label='Password'
							type='password'
							name='password'
							placeholder='password'
							Icon={CiLock}
						/>

						<InputField
							label='Confirm Password'
							type='password'
							name='confirmPassword'
							placeholder='confirm password'
							Icon={CiLock}
						/>

						<button className='button'>
							<p>Sign Up</p>
						</button>
					</form>

					<div className='flex justify-center gap-2 pt-6 text-h4'>
						<p className='text-sec'>Already have an account</p>{" "}
						<Link className='text-pry hover:underline' to={"/login"}>
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
						className='object-contain '
					/>
				</div>
			</section>
		</main>
	);
};

export default SignupPage;
