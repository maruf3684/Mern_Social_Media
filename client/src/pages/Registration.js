import React, { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";


const Registration = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState(null);
	const {authTokens, setAuthTokens,user,setUser} = useContext(AuthContext)
	let navigate = useNavigate();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(null)

		axios
			.post("/api/v1/auth/signup", {
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: password,
			})
			.then((res) => {
				toast.success("Register Successfully")
				setAuthTokens(res.data.accessToken)
				setUser(jwt_decode(res.data.accessToken))
				localStorage.setItem('authTokens', JSON.stringify(res.data.accessToken))
				navigate("/", { replace: true });
			})
			.catch((err) => {
				setErr(err);
				err?.response?.data?.actualError?.extramessage && toast.error(err?.response?.data?.actualError?.extramessage);
			});
	};

	return (
		<div className="min-h-full flex items-center  justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h1 className="text-center text-2xl font-extrabold text-indigo-500">
						DEMO SOCIAL
					</h1>
					<h3 className="mt-6 text-center text-xl  text-gray-500">
						Create new account
					</h3>
				</div>
				<form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-5 ">
						<div>
							<label htmlFor="first-name" className="sr-only">
								First Name
							</label>
							<input
								onChange={(e) => setFirstname(e.target.value)}
								value={firstname}
								id="first-name"
								name="first-name"
								required
								className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="First Name (Min 3 Character)"
							/>
							<small className="text-red-500 pl-1">
								{err &&
									err?.response?.data?.actualError?.errors?.firstName?.message}
							</small>
						</div>
						<div>
							<label htmlFor="last-name" className="sr-only">
								Last Name
							</label>
							<input
								onChange={(e) => setLastname(e.target.value)}
								value={lastname}
								id="last-name"
								name="last-name"
								required
								className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Last Name (Min 3 Character)"
							/>
							<small className="text-red-500 pl-1">
								{err &&
									err?.response?.data?.actualError?.errors?.lastName?.message}
							</small>
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
							<small className="text-red-500 pl-1">
								{err && err?.response?.data?.actualError?.errors?.email?.message}
							</small>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password (Min 8 Character)"
							/>
							<small className="text-red-500 pl-1">
								{err &&
									err?.response?.data?.actualError?.errors?.password?.message}
							</small>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Sign up
						</button>
					</div>
				</form>

				<p className="text-center text-gray-500 ">
					Already have account?{" "}
					<span className="text-indigo-500">
						{" "}
						<Link to="/signin"> Sign in</Link>
					</span>
				</p>
			</div>
		</div>
	);
};

export default Registration;
