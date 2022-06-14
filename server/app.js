const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const express = require("express");
const app = express();
var cors = require("cors");
const morgan = require("morgan");
const path = require("path");

//middlewere
const dbConnect = require("./config/databaseConfig");
const postRouter = require("./routes/postRoutes");
const AppError = require("./middlewere/appError");
const errorController = require("./middlewere/globalErrorHandler");
const authRouter=require('./routes/authRouter')
dbConnect();


app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.static('build'));



app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

app.use((req,res,next)=>{
	res.sendFile(path.join(__dirname,'build','index.html'))
})

//not found // error object ke is_operational propeerty true kore dibe
app.use("*", (req, res, next) => {
	const error = new AppError("Requested Url Not found / last middlewere", 404);
	error.status = 404;
	next(error);
});

app.use(errorController);

module.exports = app;
