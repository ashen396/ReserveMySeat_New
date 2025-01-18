const jwt = require("jsonwebtoken");
const BookingService = require("../services/bookingService.js");
const { PERMISSIONS: Permissions } = require("../config/role.js");
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

module.exports = class BookingController {
    static async getBookingById(req, res) {
        // let token = validateToken(req, res)
        // if (token) {
        //     const tokenResult = checkToken(token, res) || { isVerified: false };

        //     if (tokenResult.isVerified) {
        //         if (authorization(Permissions.BOOKING.GET_ID, tokenResult.data.role)) {
        try {
            const bookingResult = await BookingService.getBookingById(req.params.id)
            res.status(200).json(bookingResult);
        } catch (error) {
            res.status(400).json({ error: error });
        }
        // } else {
        //     res.status(403).send("Forbidden");
        //     return;
        // }
        // }
        // }
    }

    static async insertBooking(req, res) {
        // let token = req.headers['x-access-token'] || req.headers['authorization'];
        // if (token === undefined) {
        //     res.status(403).send("Invalid Token");
        //     return;
        // }

        // if (token.startsWith('Bearer ')) {
        //     token = token.slice(7, token.length);
        //     const tokenResult = checkToken(token, res) || { isVerified: false }

        //     if (tokenResult.isVerified) {
        //         if (authorization(Permissions.BOOKING.INSERT, tokenResult.data.role)) {
        try {
            const bookingObj = new Object({
                user: req.body.user,
                schedule: req.body.schedule,
                seats: req.body.seats
            });

            const bookingResult = await BookingService.createBooking(bookingObj);
            res.status(200).json(bookingResult);
        } catch (error) {
            console.log(error);
        }
        // }
        //     } else {
        //         res.status(403).send("Forbidden");
        //         return;
        //     }
        // }
    }

    static async confirmBooking(req, res) {
        try {
            const bookingResult = await BookingService.confimBooking(req.query.bookingId);
            // res.status(200).json(bookingResult);
            new ResponseHandler(res, 200, "bookings", bookingResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }
}