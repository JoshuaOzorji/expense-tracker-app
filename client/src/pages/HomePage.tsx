import Activity from "@/components/Activity";
import Dashboard from "@/components/Dashboard";
import { useAuthUser } from "@/hooks/AuthApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const { authUser } = useAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!authUser) {
			navigate("/login");
		}
	}, [authUser, navigate]);

	return (
		<main className='bucket'>
			<Dashboard />
			<Activity />
		</main>
	);
};

export default HomePage;
