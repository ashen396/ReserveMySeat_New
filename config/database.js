// require("dotenv").config();
const mongoose = require("mongoose");

module.exports = connectDB = async (req, res, next) => {
    try {
        // await mongoose.connect("mongodb+srv://cluster0.fs0we.mongodb.net", {
        await mongoose.connect(process.env.MONGO_URL, {
            // autoCreate: false,
            // connectTimeoutMS: 5000,
            // dbName: "ReserveMySeat",
            dbName: process.env.MONGO_DB,
            // forceServerObjectId: true,
            // heartbeatFrequencyMS: 1000,
            // localThresholdMS: 2000,
            // maxConnecting: 3,
            // maxIdleTimeMS: 3000,
            // maxPoolSize: 5,
            // maxStalenessSeconds: 2000,
            // minHeartbeatFrequencyMS: 1000,
            // minPoolSize: 1,
            // monitorCommands: true,
            // socketTimeoutMS: 5000,
            // ssl: true,
            // user: "ashenrenon396",
            user: process.env.MONGO_DB_USERNAME,
            // pass: "Mypass396"
            pass: process.env.MONGO_DB_PASSWORD
        }).then(() =>
            console.log(`Connected to ${mongoose.connection.db.databaseName} db on port ${mongoose.connection.port}`)
        ).catch((err) => res.status(500).json({err: err.message}));
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("MongoDB connection error", error);
        process.exit(1);
    }
}