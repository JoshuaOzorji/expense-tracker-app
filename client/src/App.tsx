import { Navigate, Route, Routes } from "react-router-dom";
import Layout2 from "./layouts/Layout2";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";

const App = () => {
	return (
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
	);
};

export default App;
