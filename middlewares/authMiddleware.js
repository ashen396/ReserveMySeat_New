const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler.js");

module.exports = function Auth(req, res, next) {
    if (req.originalUrl.includes("/api-docs")) {
        return next();
    }

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token === undefined) {
        const error = {
            "field": "authorization",
            "location": "header",
            "message": "Invalid Token",
            "description": "Token is not provided"
        }

        new ErrorHandler(403, error, res);
        return null;
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.TOKEN_KEY || "reservemyseat", (err, decode) => {
            if (err) {
                const error = {
                    "field": "authorization",
                    "location": "header",
                    "message": err.name,
                    "description": err.message
                }

                new ErrorHandler(401, error, res);
                return null;
            } else {
                req.data = decode;
                next();
            }
        })
    }
}