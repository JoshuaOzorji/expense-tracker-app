import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				bitter: ["Bitter", "system-ui"],
				dmSans: ["DM Sans", "system-ui"],
			},
			screens: {
				sm: "300px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},

			colors: {
				pry: "#EC535B",
				accent: "#f5f3f4",
				sec: "#adb5bd",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ["light"],
	},
};
