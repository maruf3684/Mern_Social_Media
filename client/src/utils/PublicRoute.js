import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {
	const { authTokens, setAuthTokens, user, setUser } = useContext(AuthContext);

	const is_authenticated = user;

	return <>{is_authenticated ? <Navigate to="/" /> : children}</>;
};

export default PublicRoute;
