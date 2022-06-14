import React, { useContext, useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Avatar from "react-avatar";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const Navber = ({ navpro, setNavPro }) => {
	const { authTokens, setAuthTokens, user, setUser } = useContext(AuthContext);
	const [preview, setPreview] = useState(null);
	const [name, setName] = useState("");
	let axiosInstance = useAxios();

	useEffect(() => {
		axiosInstance
			.get(`/api/v1/auth/getuser/?email=${user.email}`)
			.then((res) => {
				setPreview(res.data.user?.photo);
				setName(`${res.data.user?.firstName} ${res.data.user?.lastName}`);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [navpro]);

	const logout = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
	};

	return (
		<div className="bg-white shadow-sm flex w-full h-[70px] items-center px-5 justify-between top-0 sticky z-10">
			<div>
				<h2 className="text-indigo-600 font-bold text-2xl cursor-pointer">
					Demo Social
				</h2>
			</div>

			<div>
				<ul className="flex gap-4">
					<li className="text-2xl cursor-pointer">
						<AiFillHome className="hover:-translate-y-1 duration-200" />
					</li>
					<li className="text-2xl cursor-pointer">
						<BiLogOut
							onClick={logout}
							className="hover:-translate-y-1 duration-200"
						/>
					</li>
					<li>
						<Avatar
							className="hover:-translate-y-1 duration-200"
							round="20px"
							size="25"
							name={name}
							src={preview}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navber;
