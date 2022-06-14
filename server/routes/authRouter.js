const express = require("express");
let authRouter = express.Router();
const AuthController=require('../controllers/authController');
const isAuthenticated = require("../middlewere/isAuthenticated");


authRouter.route("/signin").post(AuthController.signIn);
authRouter.route("/signup").post(AuthController.signUp);
authRouter.route("/signupWithGoogle").post(AuthController.signUpWithGoogle);


authRouter.route("/getuser").get(isAuthenticated,AuthController.getUser);
authRouter.route("/getuser").post(isAuthenticated,AuthController.postUser);
module.exports=authRouter;

///?email=${user.email}