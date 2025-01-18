const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PAY_EVENTS = require("../config/paymentEvents.js");

const bookingSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    schedule: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "schedule",
    },
    seats: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: PAY_EVENTS.PENDING
    }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema);