const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService.js");
const { PERMISSIONS: Permissions, ROLES } = require("../config/role.js");
const EncryptionHandler = require("../utils/encryptionHandler.js");
const ResponseHandler = require("../utils/responseHandler.js");
const ErrorHandler = require("../utils/errorHandler.js");

// const validateToken = (req, res) => {
//     let token = req.headers['x-access-token'] || req.headers['authorization'];
//     if (token === undefined) {
//         res.status(403).send("Invalid Token");
//         return;
//     }

//     if (token.startsWith('Bearer ')) {
//         token = token.slice(7, token.length);

//         return token;
//     }
// }

// const checkToken = (token, res) => {
//     let isVerified = false;
//     let decodeData = null;

//     jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
//         if (err) {
//             isVerified = false;
//             res.status(401).send("Unauthorized");
//             return { isVerified: false };
//         } else {
//             decodeData = decode;
//             isVerified = true;
//         }
//     })

//     if (isVerified)
//         return { isVerified: true, data: decodeData };
// }

// const authorization = (roles = [String], userRole = String) => {
//     return roles.includes(userRole);
// }

module.exports = class User {
    static async getUserById(req, res) {
        // let token = validateToken(req, res)
        // if (token) {
        //     const tokenResult = checkToken(token, res) || { isVerified: false };

        //     if (tokenResult.isVerified) {
        //         if (authorization(Permissions.USER.GET_ID, tokenResult.data.role)) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const userResult = await UserService.getUserById(req.params.id);

                if (userResult === null) {
                    const error = {
                        "name": "No User Found",
                        "message": "Get User By Id Error!",
                        "error": "User is not found by the ID"
                    }
                    new ErrorHandler(404, error, res);
                } else {
                    delete userResult.password;
                    delete userResult.nic;
                    delete userResult.contact;
                    delete userResult.email;
                    new ResponseHandler(res, 200, "users", userResult)
                }
            } else {
                new ErrorHandler(400, "Bad Request", res);
            }
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
        //         } else {
        //             res.status(403).send("Forbidden");
        //             return;
        //         }
        //     }
        // }
    }

    static async insertUser(req, res) {
        // let token = validateToken(req, res)
        // if (token) {
        //     const result = checkToken(token, res) || { isVerified: false };

        //     if (result.isVerified) {
        //         if (result.data.role === ROLES.GUEST || result.data.role === ROLES.USER || result.data.role === ROLES.ADMIN) {
        try {
            const userObj = new Object({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nic: req.body.nic,
                contact: req.body.contact,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });

            const userResult = await UserService.createUser(userObj);
            delete userResult.password;
            delete userResult.nic;
            delete userResult.contact;
            delete userResult.email;

            new ResponseHandler(res, 200, "users", userResult)
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
        //             } else {
        //                 res.status(403).send("Forbidden");
        //                 return;
        //             }
        //         }
        //     }
    }
}