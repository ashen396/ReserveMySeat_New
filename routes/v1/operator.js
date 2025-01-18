const express = require("express");
const router = express.Router();
const BookingController = require("../../controllers/bookingController.js");

router.get("/bookings/:id", BookingController.getBookingById);

module.exports = router