import React from "react";

const Spinner = () => {
	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="bg-sky-500 h-10 w-10 rounded-full animate-ping"></div>
		</div>
	);
};

export default Spinner;
