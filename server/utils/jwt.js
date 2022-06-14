const jwt = require("jsonwebtoken");

function generateToken(payload) {
	var token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
}



module.exports =  generateToken;