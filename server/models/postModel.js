const mongoose = require("mongoose");
const commentModel=require('./commentModel')
const postSchema = new mongoose.Schema(
	{
		post: {
			type: String,
			maxlength: [5000, "post must be less than 5000 characters long"],
			trim: true,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		upVote: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		downVote: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],

		image: String,

		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);


//populate parant referenced virtuals
postSchema.virtual("comment", {
	ref: "Comment",
	foreignField: "post",
	localField: "_id",
});
postSchema.pre(/^find/, function (next) {

	this.populate({
		path: "user",
		select: "firstName lastName photo _id",
	});

	next();
});




const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
