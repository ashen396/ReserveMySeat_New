const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const EncryptionHandler = require("../../utils/encryptionHandler.js");
const userModel = require("../../models/user.js");
const { ROLES } = require('../../config/role');
const ErrorHandler = require("../../utils/errorHandler.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const checkToken = (res, token) => {
    jwt.verify(token, process.env.TOKEN_KEY, (err) => {
        if (err) {
            const error = {
                "field": "action",
                "location": "header",
                "message": "Unauthorized",
                "description": "User is not authorized"
            }

            new ErrorHandler(401, error, res);
        } else {
            new ResponseHandler(res, 200, "message", "Welcome");
        }
    })
}

app.get('/', (req, res) => {
    if (req.headers.action === 'login') {
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
            checkToken(res, token);
        }
    } else {
        const error = {
            "field": "authorization",
            "location": "header",
            "message": "Method Not Allowed",
            "description": "User does not have permission to proceed"
        }

        new ErrorHandler(405, error, res);
    }
})

/**
 * @swagger
 * /api/auth:
 *   post:
 *     tags: [Auth]
 *     summary: Generate JWT Token
 *     description: Generates a JWT token for authorization
 *     requestBody:
 *       required: false
 * 
 *     responses:
 *       200:
 *         description: Successfully generates a JWT token
 * 
 *       500:
 *         description: Server error
 * 
 */
app.post('/', (req, res) => {
    if (req.headers.action === undefined) {
        const token = jwt.sign({ ip: req.ip, role: "ntc" },
            process.env.TOKEN_KEY || "reservemyseat", { expiresIn: process.env.TOKEN_EXP || 36000 });

        new ResponseHandler(res, 200, "token", token);
        return null;
    }
    if (req.headers.action === 'register') {
        if (req.body.username === undefined || req.body.username === null) {
            const error = {
                "field": "username",
                "location": "body",
                "message": "Bad Request",
                "description": "Username is not provided"
            }

            new ErrorHandler(400, error, res);
            return null;
        }

        userModel.findOne({ username: req.body.username }).then((data) => {
            if (data !== null) {
                EncryptionHandler.compare(req.body.password, data.password).then((result) => {
                    if (!result) {
                        const error = {
                            "field": "password",
                            "location": "body",
                            "message": "Bad Request",
                            "description": "Incorrect Password"
                        }

                        new ErrorHandler(400, error, res);
                        return null;
                    }

                    const token = jwt.sign({ username: req.body.username, role: process.env.USER_ROLE }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_EXP || 600 });
                    new ResponseHandler(res, 200, "token", token);
                    return null;
                })
            } else {
                const error = {
                    "field": "username",
                    "location": "body",
                    "message": "Bad Request",
                    "description": "Incorrect Username"
                }

                new ErrorHandler(400, error, res);
            }
        });

    } else {
        const error = {
            "field": "action",
            "location": "header",
            "message": "Method Not Allowed",
            "description": "User does not have permission to proceed"
        }

        new ErrorHandler(405, error, res);
    }
})


module.exports = app;