const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema({
    permitNumber: {
        type: String,
        required: true
    },
    busNumber: {
        type: String,
        required: true
    },
    seats: {
        type: Array,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "driver"
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "route"
    }
})

module.exports = mongoose.model("Bus", busSchema);