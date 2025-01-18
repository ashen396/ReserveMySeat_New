const BusDTO = require("../dtos/busDTO.js");
const BusModel = require("../models/bus.js");
const DriverModel = require("../models/driver.js");
const RouteModel = require("../models/route.js");
// const memCache = require("memory-cache");

module.exports = class BusService {
    static async getAllBuses() {
        try {
            const busResults = await BusModel.find()
                .populate({
                    path: "driver",
                    model: DriverModel
                })
                .populate({
                    path: "route",
                    model: RouteModel
                });

            const busDTOResults = busResults.map((bus) => new BusDTO(bus));
            // memCache.put("buses", busDTOResults, process.env.CACHE_EXP);
            return busDTOResults;
        } catch (err) {
            console.log(err);
        }
    }

    static async getBusById(id) {
        const busResult = await BusModel.findById(id)
            .populate({
                path: "driver",
                model: DriverModel
            })
            .populate({
                path: "route",
                model: RouteModel
            });

        if (busResult == null)
            return busResult;

        const busDTOResult = new BusDTO(busResult);
        return busDTOResult;
    }

    static async createBus(obj) {
        const busDTO = new BusDTO(obj);
        return await new BusModel({
            permitNumber: busDTO.permitNumber,
            busNumber: busDTO.busNumber,
            seats: busDTO.seats,
            driver: busDTO.driver,
            route: busDTO.route
        }).save();
    }

    static async updateBus(obj) {
        const busDTO = new BusDTO(obj);
        return await BusModel.findByIdAndUpdate(
            { _id: busDTO._id },
            {
                permitNumber: busDTO.permitNumber,
                busNumber: busDTO.busNumber,
                seats: busDTO.seats,
                driver: busDTO.driver,
                route: busDTO.route
            });
    }

    static async deleteBus(id) {
        return await BusModel.findByIdAndDelete({ _id: id });
    }
}