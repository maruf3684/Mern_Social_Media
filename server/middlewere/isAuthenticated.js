const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const userModel = require("../models/userModel");
const AppError = require("./appError");


async function isAuthenticated(req, res, next) {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		//grab and decode tocken
		const token = req.headers.authorization.split(" ")[1];
		let decode;
		try {
			decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
			
		} catch (err) {
			return next(new AppError("Invalid Token", 401));
		}

		//check if user exist
		const currentUser = await userModel.findById(decode.userId);
		if (!currentUser) {
			return next(
				new AppError(
					"The user belonging to this token does no longer exist.",
					404
				)
			);
		}

		req.user = currentUser;
		res.locals.user = currentUser;
		return next();
	} else {
		return next(new AppError("You are not authenticated", 401));
	}
}

module.exports = isAuthenticated;