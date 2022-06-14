import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Homepage from "./pages/Homepage";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Toaster />
			<AuthProvider>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Homepage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/signin"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<PublicRoute>
								<Registration />
							</PublicRoute>
						}
					/>
					<Route path="/*" element={<Homepage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
