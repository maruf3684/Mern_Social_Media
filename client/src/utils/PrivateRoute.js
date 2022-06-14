import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
	const { authTokens, setAuthTokens, user, setUser } = useContext(AuthContext);

	const is_authenticated = user;

	return <>{is_authenticated ? children : <Navigate to="/signin" />}</>;
};

export default PrivateRoute;
