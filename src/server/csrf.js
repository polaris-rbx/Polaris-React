// CSRF Protection

const { randomBytes } = require("crypto");

function generateToken (length = 100){
	return new Promise(((resolve, reject) => {
		// we'll never use all the bytes, but might as well make sure
		randomBytes(length, (err, buffer) => {
			if (err) {
				return reject(err);
			}
			const token = buffer.toString("hex");
			return resolve(token.substr(0, length));
		});
	}));
}
const protectedMethods = ["post", "patch", "put", "delete"];
module.exports = function (req, res, next) {
	function fail () {
		return res.status(400).send({
			error: {
				status: 400,
				message: "Failed CSRF token validation"
			}
		});
	}
	if (protectedMethods.includes(req.method.toLowerCase())) {
		// Validate CSRF presence
		if (req.cookies["CSRF-Token"] && req.get("CSRF-Token")) {
			if (req.cookies["CSRF-Token"] === req.get("CSRF-Token")) {
				console.log("CSRF pass")
				return next();
			}
		}
		return fail();
	} else {
		// It's a get
		if (!req.cookies["CSRF-Token"]) {
			res.cookie("CSRF-Token", generateToken(20), {
				maxAge: 172800000,
				sameSite: "strict",
				httpOnly: false
			});
		}
		return next();
	}
};
