const catchAsync = require("../middlewere/catchAsync");
const postModel = require("../models/postModel");
const AppError = require("../middlewere/appError");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const generateToken = require("../utils/jwt");
var bcrypt = require("bcryptjs");
const jwt_decode = require("jwt-decode");
const crypto = require("crypto");
class AuthController {
	static signIn = catchAsync(async (req, res, next) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(new AppError("Please provide email and password", 400));
		}

		//check user available
		const user = await userModel
			.findOne({ email: req.body.email })
			.select("+password");

		//check password same or not
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return next(new AppError("Incorrect Email Or Password", 401));
		}

		let object = {
			userId: user._id,
			email: user.email,
			firstname: user.firstName,
			lastname: user.lastName,
		};
		let accessToken = generateToken(object);

		res.status(200).json({
			success: true,
			accessToken: accessToken,
		});
	});

	static signUp = catchAsync(async (req, res, next) => {
		const { firstname, lastname, email, password } = req.body;

		if ((await userModel.find({ email: email })).length > 0) {
			return next(new AppError("User already exist", 500));
		}

		let user = await userModel.create({
			firstName: firstname,
			lastName: lastname,
			email: email,
			password: password,
		});
		user.password = undefined;

		let object = {
			userId: user._id,
			email: user.email,
			firstname: user.firstName,
			lastname: user.lastName,
		};
		let accessToken = generateToken(object);

		res.status(201).json({
			success: true,
			accessToken: accessToken,
			data: user,
		});
	});

	static signUpWithGoogle = catchAsync(async (req, res, next) => {
		const { token } = req.body;
		if (!token) {
			return next(new AppError("You have no valid credential", 500));
		}
		let userObject = jwt_decode(token);
		let name = userObject.name;
		let namearr = name.split(" ");
		let firstname = namearr[0];
		let lastname = namearr[1] || namearr[0];
		let picture = userObject.picture ? userObject.picture : null;
		let password = crypto.randomUUID();

		console.log("mypic=", picture);

		//check user has database or not
		let user = await userModel.findOne({ email: userObject.email });

		let accessToken;
		if (!user) {
			let refreshUser = await userModel.create({
				firstName: firstname,
				lastName: lastname,
				email: userObject.email,
				password: password,
				photo: picture,
			});

			let object = {
				userId: refreshUser._id,
				email: refreshUser.email,
				firstname: refreshUser.firstName,
				lastname: refreshUser.lastName,
			};

			accessToken = generateToken(object);
		} else {
			let object = {
				userId: user._id,
				email: user.email,
				firstname: user.firstName,
				lastname: user.lastName,
			};
			accessToken = generateToken(object);
		}

		res.status(201).json({
			success: true,
			accessToken: accessToken,
		});
	});

	static getUser = catchAsync(async (req, res, next) => {
		let email = req.query.email;
		const user = await userModel.findOne({ email: email }).select("-password");
		res.status(200).json({
			success: true,
			user: user,
		});
	});

	static postUser = catchAsync(async (req, res, next) => {
		let email = req.query.email;

		const user = await userModel.findOneAndUpdate(
			{ email: email },
			{ photo: req.body.photo }
		);

		res.status(200).json({
			success: true,
		});
	});
}

module.exports = AuthController;
