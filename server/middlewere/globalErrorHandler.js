const errorController = (err, req, res, next) => {

    //console.log("Comming to error controller");
	//console.log(err);
	err.statusCode = err.statusCode || 500;
	errrorInDevelopment(err, req, res);
};

const errrorInDevelopment = (err, req, res) => {
	return res.status(err.statusCode).json({
		success: false,
		actualError: err,
	});
};

module.exports = errorController;