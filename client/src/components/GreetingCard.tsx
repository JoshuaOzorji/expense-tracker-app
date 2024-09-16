import { useAuthUser } from "@/hooks/AuthApi";

const GreetingCard = () => {
	const { authUser } = useAuthUser();

	const getGreeting = () => {
		const currentHour = new Date().getHours();

		if (currentHour >= 0 && currentHour < 12) {
			return "Good morning";
		} else if (currentHour >= 12 && currentHour < 18) {
			return "Good afternoon";
		} else {
			return "Good evening";
		}
	};
	return (
		<main className='text-sm md:text-base'>
			{getGreeting()}, {authUser?.firstName}
		</main>
	);
};

export default GreetingCard;
