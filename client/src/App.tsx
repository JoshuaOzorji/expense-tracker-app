import { Navigate, Route, Routes } from "react-router-dom";
import Layout2 from "./layouts/Layout2";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<main>
			<Routes>
				<Route element={<Layout2 />}>
					<Route path='/login' element={<LoginPage />} />

					<Route path='/signup' element={<SignupPage />} />
				</Route>

				<Route element={<Layout />}>
					<Route path='/' element={<HomePage />} />
				</Route>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>

			<Toaster
				toastOptions={{
					className:
						"border px-[6px] py-[4px] text-sm rounded-md bg-[#F8F9F9] text-black",

					success: {
						iconTheme: {
							primary: "#27AE60",
							secondary: "#F2F3F4",
						},
					},

					error: {
						iconTheme: {
							primary: "#C0392B",
							secondary: "#F2F3F4",
						},
					},
				}}
			/>
		</main>
	);
};

export default App;
