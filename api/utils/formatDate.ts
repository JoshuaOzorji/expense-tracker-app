export const formatDate = (date: Date): string => {
	const now = new Date();
	const diffInSeconds = Math.floor(
		(now.getTime() - date.getTime()) / 1000,
	);

	// If less than 60 seconds, show "X sec ago"
	if (diffInSeconds < 60) {
		return `${diffInSeconds} sec ago`;
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);

	// If less than 60 minutes, show "X min ago"
	if (diffInMinutes < 60) {
		return `${diffInMinutes} min ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);

	// If less than 24 hours, show "X hr ago"
	if (diffInHours < 24) {
		return `${diffInHours} hr ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);

	// If exactly 1 day, show "yesterday"
	if (diffInDays === 1) {
		return "yesterday";
	}

	// If more than 1 day, show "DD-MMM-YY"
	return date
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "2-digit",
		})
		.replace(/ /g, "-");
};
