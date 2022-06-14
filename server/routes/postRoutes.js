const express = require("express");
let postRouter = express.Router();
const PostController = require("../controllers/postController");
const isAuthenticated =require('../middlewere/isAuthenticated')

postRouter.route("/").post(isAuthenticated,PostController.createPost);
postRouter.route("/").get(isAuthenticated,PostController.getAllPost);
postRouter.route("/:id").delete(isAuthenticated,PostController.deletePost);


postRouter.route("/:id/addcomment").post(isAuthenticated,PostController.addcomment);

postRouter.route("/:id/upvote").get(isAuthenticated,PostController.upvote);
postRouter.route("/:id/downvote").get(isAuthenticated,PostController.downvote);

module.exports=postRouter;