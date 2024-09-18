import Activity from "@/components/Activity";
import Dashboard from "@/components/Dashboard";
import { useAuthUser } from "@/hooks/AuthApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const { authUser } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (authUser) {
			navigate("/dashboard");
		}
	}, [authUser, navigate]);

	return (
		<main>
			<div className='bucket'>
				<div className='overflow-hidden'>
					<Dashboard />
				</div>
				<div className='overflow-hidden'>
					<Activity />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
