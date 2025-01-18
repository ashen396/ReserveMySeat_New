const memCache = require("memory-cache");
// const jwt = require("jsonwebtoken");
// const { PERMISSIONS: Permissions } = require("../config/role.js");

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

module.exports = function caching(req, res, next) {
    // if (Object.keys(req.query).length !== 0) {
    //     next()
    // } else {
        // let token = validateToken(req, res);
        // if (token) {
        //     const tokenResult = checkToken(token, res) || { isVerified: false };

        //     if (tokenResult.isVerified) {
        //         if (authorization(Permissions.SCHEDULE.GET_ALL, tokenResult.data.role)) {
                    // let cache = null;
                    // if (req.route.path === "/schedules")
                        cache = memCache.get("schedules");

                    if (cache !== null) {
                        // if (req.headers['etag'] !== undefined) {
                            // if (req.headers['etag'] == cache.etag) {
                                // res.status(304).send("Not Modified");
                                // return null;
                            // } else {
                                // res.status(412).send("Precondition Failed");
                                // return null;
                            // }
                        // }

                        res.status(200).send(cache.data);
                    } else {
                        next();
                    }
                }
                // else {
                //     res.status(403).send("Forbidden");
                //     return;
                // }
            // }
        // }
    // }
// }