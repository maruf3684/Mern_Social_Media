import React, { useEffect, useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import FileBase64 from "react-file-base64";
import axios from "axios";
import useAxios from "../utils/useAxios";

const AddPost = ({ refresh, setRefresh }) => {
	const fileInputref = useRef(null);

	const [postBody, setPostBody] = useState("");
	const [image, setImage] = useState(null);
	const axiosInstance = useAxios();

	useEffect(() => {
		fileInputref.current.firstChild.accept = "image/*";
	}, []);

	const handleSubmit = async () => {
		try {
			if (postBody || image) {
				await axiosInstance.post("/api/v1/posts", {
					post: postBody,
					image: image,
				});
				setRefresh(!refresh);
			}
		} catch (err) {
			console.log(err);
		}

		setPostBody("");
		setImage(null);
	};

	return (
		<div className="bg-white rounded-lg">
			<input
				required
				type="text"
				placeholder="What's happening?"
				className="w-full h-20 focus:outline-none rounded-lg text-lg p-5"
				onChange={(e) => setPostBody(e.target.value)}
				value={postBody}
			/>
			<hr />
			<div className="flex justify-between px-5 py-2 items-center">
				<div>
					<button
						className="py-2 px-1"
						onClick={(e) => {
							e.preventDefault();
							fileInputref.current.firstChild.click();
						}}
					>
						<BsFillImageFill
							className={`text-2xl text-indigo-500  ${image && "animate-ping"}`}
						/>
					</button>
				</div>
				<div>
					<div className="hidden" ref={fileInputref}>
						<FileBase64
							type="file"
							multiple={false}
							onDone={(base64) => setImage(base64)}
						/>
					</div>

					<button
						onClick={handleSubmit}
						className=" rounded-full py-[.3rem] px-5 border border-transparent text-sm font-medium  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddPost;
