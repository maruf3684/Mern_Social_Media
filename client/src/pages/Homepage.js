import React, { useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import Navber from "../components/Navber";
import PostCard from "../components/PostCard";
import Profile from "../components/Profile";
import Sideber from "../components/Sideber";
import axios from "axios";
import Spinner from "../components/Spinner";
import useAxios from "../utils/useAxios";

const Homepage = () => {
	const [posts, setPosts] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(false);
	const [navpro, setNavPro] = useState(false);
	const axiosInstance = useAxios();

	useEffect(() => {
		async function datacall() {
			setLoading(true);
			try {
				const response = await axiosInstance.get("/api/v1/posts");
				setPosts(response.data.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		}
		datacall();
	}, [refresh]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className="relative ">
					<Navber navpro={navpro} setNavPro={setNavPro} />
					<div className="grid grid-cols-5 mt-3 p-5">
						<div className=" hidden lg:block mx-auto">
							<Sideber />
						</div>
						<div className="col-span-5 lg:col-span-3 px-10 md:p-0">
							<AddPost refresh={refresh} setRefresh={setRefresh} />

							{posts &&
								posts.map((post, index) => (
									<PostCard
										key={index}
										posts={post}
										setPosts={setPosts}
										refresh={refresh}
										setRefresh={setRefresh}
										navpro={navpro}
									/>
								))}
						</div>
						<div className="hidden lg:block px-5 ">
							<Profile navpro={navpro} setNavPro={setNavPro} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Homepage;
