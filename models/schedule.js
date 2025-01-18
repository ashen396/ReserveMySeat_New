const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "bus"
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    bookings: {
        type: Array
    }
}, { timestamps: true })

module.exports = mongoose.model("Schedule", scheduleSchema);