import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import LandingPage from "./pages/landingpage/LandingPage";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		// <div className='p-4 h-screen flex items-center justify-center'>
		<div>
			<Routes>
			<Route path='/' element={<LandingPage />} />
                {/* <Route path='/home' element={authUser ? <Home /> : <Navigate to='/login' />} /> */}
                <Route path='/home' element={authUser ? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={authUser ? <Navigate to='/home' /> : <Login />} />
                <Route path='/signup' element={authUser ? <Navigate to='/home' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;