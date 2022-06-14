const mongoose = require("mongoose");
const userModel=require('./userModel')
const postModel=require('./postModel')
const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: [true, "Comment body is required"],
		minlength: [1, "Comment must be at least 1 characters long"],
		maxlength: [5000, "comment must be less than 5000 characters long"],
		trim: true,
	},

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

commentSchema.pre(/^find/, function (next) {

	this.populate({
		path: "user",
		select: "firstName lastName",
	});

	next();
});


const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;