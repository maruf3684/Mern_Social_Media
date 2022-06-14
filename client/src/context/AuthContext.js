import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
	let [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	let [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
        //console.log("auth provider useeffect");
		if (authTokens) {
			setUser(jwt_decode(authTokens));
		}
		setLoading(false);
	}, [authTokens, loading]);

	let contextData = {
		user: user,
		authTokens: authTokens,
		setAuthTokens: setAuthTokens,
		setUser: setUser,
	};

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
};
