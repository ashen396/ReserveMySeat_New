const mongoose = require("mongoose");
const DriverService = require("../services/driverService.js");
const ResponseHandler = require("../utils/responseHandler.js");
const ErrorHandler = require("../utils/errorHandler.js");

module.exports = class DriverController {
    static async getAllDrivers(req, res) {
        try {
            const driverResult = await DriverService.getAllDrivers();
            new ResponseHandler(res, 200, "drivers", driverResult, driverResult.length);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async getDriverById(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const driverResult = await DriverService.getDriverById(req.params.id);

                if (driverResult === null) {
                    const error = {
                        "message": "NotFoundError",
                        "error": "Driver Not Found"
                    }

                    new ErrorHandler(404, error, res);
                } else {
                    new ResponseHandler(res, 200, "drivers", driverResult);
                }
            } else {
                const error = {
                    "message": "ValidationError",
                    "error": "Invalid Driver ID"
                }

                new ErrorHandler(400, error, res);
            }
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async insertDriver(req, res) {
        try {
            const driverObj = new Object({
                nic: req.body.nic,
                name: req.body.name,
                contact: req.body.contact
            });

            const driverResult = await DriverService.createDriver(driverObj);
            new ResponseHandler(res, 201, "driver", driverResult);
        } catch (error) {
            if (error.name === "ValidationError") {
                new ErrorHandler(400, error, res);
                return null;
            }

            new ErrorHandler(500, error, res);
        }
    }

    static async updateDriver(req, res) {
        try {
            const driverObj = new Object(
                {
                    _id: req.params.id,
                    nic: req.body.nic,
                    name: req.body.name,
                    contact: req.body.contact
                });

            const driverResult = await DriverService.updateDriver(driverObj);
            new ResponseHandler(res, 204, "driver", driverResult);
        } catch (error) {
            if (error.name === "ValidationError") {
                new ErrorHandler(400, error, res);
                return null;
            }

            new ErrorHandler(500, error, res);
        }
    }

    static async deleteDriver(req, res) {
        try {
            const driverResult = await DriverService.deleteDriver(req.params.id);
            new ResponseHandler(res, 204, "driver", driverResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }
}
