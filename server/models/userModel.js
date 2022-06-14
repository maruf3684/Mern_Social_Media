const mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		required: [true, "First name is required"],
		minlength: [3, "First name must be at least 3 characters long"],
		maxlength: [10, "First name must be less than 10 characters long"],
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, "Last name is required"],
		minlength: [3, "Last name must be at least 3 characters long"],
		maxlength: [10, "Last name must be less than 10 characters long"],
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: [true, "Email already exists"],
		required: [true, "Email is required"],
		validate: [validator.isEmail, "invalid email"],
	},
	password: {
		type: String,
		select: false,
		required: [true, "Password is required"],
		minlength: [8, "Password must be at least 8 characters long"],
	},

	photo: {
		type: String,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;