const DriverModel = require("../models/driver.js");
const DriverDTO = require("../dtos/driverDTO.js");

module.exports = class DriverService {
    static async getAllDrivers(res) {
        try {
            const driverResults = await DriverModel.find();
            return driverResults.map((_driver) => new DriverDTO(_driver));
        } catch (error) {
            throw {
                "message": "Get All Drivers Error!",
                "error": error.message
            };
        }
    }

    static async getDriverById(id) {
        try {
            const driverResult = await DriverModel.findById({ _id: id });
            return new DriverDTO(driverResult);
        } catch (error) {
            throw {
                "message": "Get Driver By Id Error!",
                "error": error.message
            };
        }
    }

    static async createDriver(obj) {
        try {
            const driverDTO = new DriverDTO(obj);
            const driverModel = new DriverModel(driverDTO);
            const driverResult = await driverModel.save();
            return driverResult;
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Create New Driver Error!",
                "error": error.message
            };
        }
    }

    static async updateDriver(obj) {
        try {
            const driverDTO = new DriverDTO(obj);
            return await DriverModel.findByIdAndUpdate(
                { _id: driverDTO._id },
                {
                    nic: driverDTO.nic,
                    name: driverDTO.name,
                    contact: driverDTO.contact
                }
            );
        } catch (error) {
            // return err;
            throw {
                "name": error.name,
                "message": "Update Driver Error!",
                "error": error.message
            };
        }
    }

    static async deleteDriver(id) {
        try {
            return await DriverModel.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw {
                "message": "Delete Driver Error!",
                "error": error.message
            };
        }
    }
}