import { Navigate, Route, Routes } from "react-router-dom";
import Layout2 from "./layouts/Layout2";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
	return (
		<Routes>
			<Route element={<Layout2 />}>
				<Route path='/login' element={<LoginPage />} />

				<Route path='/signup' element={<SignupPage />} />
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default App;


