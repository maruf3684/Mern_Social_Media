import React, { useRef, useState, useEffect, useContext } from "react";
import Avatar from "react-avatar";
import { AiOutlineEllipsis } from "react-icons/ai";
import {
	BsFillHandThumbsUpFill,
	BsFillHandThumbsDownFill,
} from "react-icons/bs";
import axios from "axios";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import moment from "moment";
import { IoMdMore} from "react-icons/io";

const PostCard = ({ posts, setPosts, refresh, setRefresh, navpro }) => {
	const dropDownRef = useRef(null);
	const axiosInstance = useAxios();
	const { authTokens, setAuthTokens, user, setUser } = useContext(AuthContext);
	const [commentwrite, setCommentwrite] = useState("");
	
	

	const toggle = () => {
		dropDownRef.current.classList.toggle("hidden");
	};

	const deleteHandler = async (id) => {
		try {
			await axiosInstance.delete(`/api/v1/posts/${id}`);
			dropDownRef.current.classList.toggle("hidden");
			setRefresh(!refresh);
		} catch (error) {
			console.log(error);
		}
	};

	const handleComment = async (id) => {
		try {
			if (commentwrite.length >= 1) {
				let update = await axiosInstance.post(
					`/api/v1/posts/${id}/addcomment`,
					{
						comment: commentwrite,
					}
				);

				let newcomment = update.data.comment;
				setPosts((prev) =>
					prev.map((single, i) => {
						if (single._id === posts._id) {
							return { ...posts, comment: [newcomment, ...posts.comment] };
						} else {
							return single;
						}
					})
				);
			}
		} catch (error) {
			console.log(error);
		}

		setCommentwrite("");
	};

	const upvote = async (id) => {
		let update = await axiosInstance.get(`/api/v1/posts/${id}/upvote`);
		let newPost = update.data.post;

		setPosts((prev) =>
			prev.map((singlepost, i) => {
				if (singlepost._id === posts._id) {
					return { ...newPost };
				} else {
					return singlepost;
				}
			})
		);
	};

	const downvote = async (id) => {
		let update = await axiosInstance.get(`/api/v1/posts/${id}/downvote`);
		let newPost = update.data.post;
		setPosts((prev) =>
			prev.map((singlepost, i) => {
				if (singlepost._id === posts._id) {
					return { ...newPost };
				} else {
					return singlepost;
				}
			})
		);
	};

	return (
		<div className="bg-white mt-5 p-5">
			{/* top part */}
			<div className="flex  w-full h-[70px] items-center  justify-between">
				<div className="flex gap-3 justify-center items-center">
					<Avatar
						round="20px"
						size="45"
						name="Wim Mostmans"
						src={posts?.user?.photo}
					/>

					<div className="flex flex-col justify-center items-start">
						<span className="font-bold">
							{`${posts.user.firstName} ${posts.user.lastName}`}{" "}
						</span>
						<small> {moment(posts.createdAt).fromNow()}</small>
					</div>
				</div>

				{posts.user._id === user.userId && (
					<div className="relative">
						<button
							id="dropdownButton"
							data-dropdown-toggle="dropdown"
							className="rounded-full text-sm  py-2.5 text-center inline-flex items-center "
							type="button"
							onClick={toggle}
						>
							<IoMdMore className="text-2xl" />
						</button>

						<div
							ref={dropDownRef}
							id="dropdown"
							className=" hidden origin-top-right absolute right-0 z-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
						>
							<ul
								className="p-1 bg-slate-200 rounded-md"
								aria-labelledby="dropdownButton"
							>
								<button
									onClick={() => {
										deleteHandler(posts._id);
									}}
								>
									delete
								</button>
							</ul>
						</div>
					</div>
				)}
			</div>

			{/* photo part */}

			{posts.image && (
				<div className="w-full h-min overflow-hidden ">
					<img
						className="mx-auto object-cover"
						src={posts.image}
						alt="Social"
					/>
				</div>
			)}

			{/* content */}
			{posts.post && (
				<div className="p-5 text-slate-600 font-semibold text-justify">
					{posts.post}
				</div>
			)}

			{/* likeber */}

			<div className="flex w-full h-[60px] items-center px-5 justify-start text-indigo-500 gap-10 border-t-2">
				<button
					onClick={() => upvote(posts._id)}
					className=" flex gap-2 w-14 items-center hover:text-indigo-800 hover:text-xl"
				>
					<BsFillHandThumbsUpFill />
					<span>{posts.upVote.length}</span>
				</button>
				<button
					onClick={() => downvote(posts._id)}
					className=" flex gap-2 w-14  items-center hover:text-indigo-800 hover:text-xl"
				>
					<BsFillHandThumbsDownFill />
					<span>{posts.downVote.length}</span>
				</button>
			</div>

			{/* commentbox */}

			<div className="mainDivOfComment  h-[60px]">
				<div className="flex w-full justify-between px-7">
					<input
						type="text"
						placeholder="Add your comment"
						className="w-full h-15  pr-6 focus:outline-none rounded-lg text-xl "
						value={commentwrite}
						onChange={(e) => setCommentwrite(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleComment(posts._id)}
					/>

					{/* <button className="bg-indigo-500 px-2 py-1 rounded-full text-white hover:bg-indigo-800">
						Comment
					</button> */}
				</div>
			</div>

			{/* alll comments */}
			{posts?.comment?.length > 0 && (
				<div className=" max-h-[300px] pr-[5rem] overflow-y-scroll scrollbar-hide">
					<ul className="w-full ">
						{posts?.comment?.length > 0 &&
							posts.comment.map((commen, index) => (
								<li
									key={index}
									className="bg-sky-400 rounded-lg p-6 pb-2 pt-2 text-sm my-5 text-white text-justify shadow-lg"
								>
									<h2 className="font-bold text-lg">{`${commen.user.firstName} ${commen.user.lastName}`}</h2>
									<p>{commen.comment}</p>
									<small className="text-purple-800 animate-pulse">
										{moment(commen.createdAt).fromNow()}
									</small>
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PostCard;
