const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Route", routeSchema);