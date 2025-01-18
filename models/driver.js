const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    nic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Driver", driverSchema);