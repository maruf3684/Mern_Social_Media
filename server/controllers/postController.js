const catchAsync = require("../middlewere/catchAsync");
const postModel = require("../models/postModel");
const AppError = require("../middlewere/appError");
const mongoose = require("mongoose");
const commentModel = require("../models/commentModel");
class PostController {
	static createPost = catchAsync(async (req, res, next) => {
		const { post, image } = req.body;
		let data;
		if (image) {
			data = await postModel.create({
				post: post,
				image: image.base64,
				user: req.user._id,
			});
		} else {
			data = await postModel.create({ post: post });
		}

		res.status(201).json({
			success: true,
			data: data,
		});
	});

	static getAllPost = catchAsync(async (req, res, next) => {
		const posts = await postModel
			.find({ new: true })
			.sort("-createdAt")
			.populate({ path: "comment", options: { sort: { createdAt: -1 } } });

		res.status(200).json({
			success: true,
			count: posts.length,
			data: posts,
		});
	});

	static deletePost = catchAsync(async (req, res, next) => {
		const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
		console.log(isValid);

		if (!isValid) {
			return next(new AppError("Not a valid id", 404));
		}

		const posts = await postModel.deleteOne({ _id: req.params.id });
		await commentModel.deleteMany({ post: req.params.id  });

		res.status(200).json({
			success: true,
		});
	});

	static addcomment = catchAsync(async (req, res, next) => {
		const id = req.params.id;
		const user = req.user;

		let comment = await commentModel.create({
			comment: req.body.comment,
			user: user._id,
			post: id,
		});

		let newComment = await comment.populate("user");

		res.status(200).json({
			success: true,
			comment: newComment,
		});
	});

	static upvote = catchAsync(async (req, res, next) => {
		const id = req.params.id;
		const user = req.user;

		let post = await postModel.findOne({
			_id: id,
			upVote: { $in: [user._id] },
		});
		let updatePost;

		if (post) {
			updatePost = await postModel
				.findOneAndUpdate(
					{ _id: id },
					{ $pull: { upVote: user._id } },
					{ new: true }
				)
				.populate({ path: "comment", options: { sort: { createdAt: -1 } } });
		} else {
			updatePost = await postModel
				.findOneAndUpdate(
					{ _id: id },
					{
						$push: { upVote: user._id },
						$pull: { downVote: user._id },
					},

					{ new: true }
				)
				.populate({ path: "comment", options: { sort: { createdAt: -1 } } });
		}

		res.status(200).json({
			success: true,
			post: updatePost,
		});
	});

	static downvote = catchAsync(async (req, res, next) => {
		const id = req.params.id;
		const user = req.user;

		let post = await postModel.findOne({
			_id: id,
			downVote: { $in: [user._id] },
		});
		let updatePost;
		if (post) {
			updatePost = await postModel
				.findOneAndUpdate(
					{ _id: id },
					{ $pull: { downVote: user._id } },
					{ new: true }
				)
				.populate({ path: "comment", options: { sort: { createdAt: -1 } } });
		} else {
			updatePost = await postModel
				.findOneAndUpdate(
					{ _id: id },
					{
						$push: { downVote: user._id },
						$pull: { upVote: user._id },
					},
					{ new: true }
				)
				.populate({ path: "comment", options: { sort: { createdAt: -1 } } });
		}

		res.status(200).json({
			success: true,
			post: updatePost,
		});
	});
}

module.exports = PostController;
