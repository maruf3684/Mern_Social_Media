import React from "react";
import {
	BsFillHouseDoorFill,
	BsHash,
	BsFillBookmarkHeartFill,
	BsFillBellFill,
	BsCardChecklist,
} from "react-icons/bs";

const Sideber = () => {
	return (
		<div >
			<ul className="flex flex-col gap-4 text-2xl cursor-pointer text-slate-600 ">
				<li className="flex items-center gap-3 hover:text-indigo-500">
					<BsFillHouseDoorFill /> Home{" "}
				</li>
				<li className="flex items-center gap-3 hover:text-indigo-500">
					<BsHash />
					Trending
				</li>
				<li className="flex items-center gap-3 hover:text-indigo-500">
					<BsFillBookmarkHeartFill />
					Bookmerks
				</li>
				<li className="flex items-center gap-3 hover:text-indigo-500">
					<BsFillBellFill />
					Notification
				</li>
				<li className="flex items-center gap-3 hover:text-indigo-500">
					<BsCardChecklist />
					Lists
				</li>
			</ul>
		</div>
	);
};

export default Sideber;
