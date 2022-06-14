import React, { useEffect, useRef, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const Profile = ({navpro,setNavPro}) => {
	const fileInputref = useRef(null);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	let axiosInstance = useAxios();
	const { authTokens, setAuthTokens, user, setUser } = useContext(AuthContext);

	const [userdata, setUserData] = useState();

	useEffect(() => {
		axiosInstance
			.get(`/api/v1/auth/getuser/?email=${user.email}`)
			.then((res) => {
				setUserData(res.data.user);
				setPreview(res.data.user?.photo);
				
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				axiosInstance.post(`/api/v1/auth/getuser/?email=${user.email}`,{
					photo:reader.result
				});
				setNavPro(!navpro)
			};
			reader.readAsDataURL(image);
		} else {
		}
	}, [image]);



	return (
		<div className="w-full h-[400px] bg-neutral-50 rounded-t-lg ">
			<div className="h-1/2 bg-cyan-400 rounded-t-lg flex flex-col items-center justify-center">
				{preview && (
					<img
						className=" rounded-full h-[5rem] w-[5rem] object-cover border-y-purple-600 border-4"
						src={preview}
						alt="pic"
						onClick={(e) => {
							e.preventDefault();
							fileInputref.current.click();
						}}
					/>
				)}
				<form action="">
					<input
						accept="image/*"
						type="file"
						className="hidden"
						ref={fileInputref}
						onChange={(e) => {
							let file = e.target.files[0];
							if (file && file.type.substr(0, 5) === "image") {
								setImage(file);
							} else {
								setImage(null);
							}
						}}
					/>
					{!preview && (
						<button
							className="border-y-purple-600 border-4 rounded-full h-[5rem] w-[5rem] bg-slate-400 font-bold"
							onClick={(e) => {
								e.preventDefault();
								fileInputref.current.click();
							}}
						>
							Add Image
						</button>
					)}
				</form>

				<h1 className="font-bold text-slate-600">
					{userdata && `${userdata.firstName}  ${userdata.lastName}`}
				</h1>
			</div>

			<div className="h-1/2 p-5 text-slate-600 text-sm font-bold">
				<p>{userdata && `${userdata.firstName}  ${userdata.lastName}`}</p>
				<p>{userdata && `${userdata.email} `}</p>
				<small className="text-blue-500">#trending #top #new </small>
			</div>
		</div>
	);
};

export default Profile;
