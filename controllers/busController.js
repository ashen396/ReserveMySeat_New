const mongoose = require("mongoose");
const BusService = require("../services/busService.js");
const ResponseHandler = require("../utils/responseHandler.js");
const ErrorHandler = require("../utils/errorHandler.js");

module.exports = class BusController {
    static async getAllBuses(req, res) {
        try {
            const busResult = await BusService.getAllBuses();
            new ResponseHandler(res, 200, "buses", busResult, busResult.length);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async getBusById(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const busResult = await BusService.getBusById(req.params.id);

                if (busResult === null) {
                    const error = {
                        "message": "NotFoundError",
                        "error": "Bus Not Found"
                    }

                    new ErrorHandler(404, error, res);
                } else {
                    new ResponseHandler(res, 200, "buses", busResult);
                }

            } else {
                const error = {
                    "message": "ValidationError",
                    "error": "Invalid Bus ID"
                }

                new ErrorHandler(400, error, res);
            }
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async insertBus(req, res) {
        try {
            const busObj = new Object({
                permitNumber: req.body.permitNumber,
                busNumber: req.body.busNumber,
                seats: req.body.seats,
                driver: req.body.driver,
                route: req.body.route
            });

            const busResult = await BusService.createBus(busObj);
            new ResponseHandler(res, 201, "bus", busResult);
        } catch (error) {
            // res.status(400).json({ error: error });
            new ErrorHandler(500, error, res);
        }
    }

    static async updateBus(req, res) {
        try {
            const busObj = new Object({
                _id: req.params.id,
                permitNumber: req.body.permitNumber,
                busNumber: req.body.busNumber,
                seats: req.body.seats,
                driver: req.body.driver,
                route: req.body.route
            });

            const busResult = await BusService.updateBus(busObj);
            // res.status(200).json(busResult);
            new ResponseHandler(res, 204, "bus", busResult);
        } catch (error) {
            // res.status(400).json({ error: error });
            new ErrorHandler(500, error, res);
        }
    }

    static async deleteBus(req, res) {
        try {
            const busResult = await BusService.deleteBus(req.params.id);
            // res.status(200).json(busResult);
            new ResponseHandler(res, 200, "bus", busResult);
        } catch (error) {
            // res.status(400).json({ error: error });
            new ErrorHandler(500, error, res);
        }
    }
}