const { isValidObjectId } = require("mongoose");
const DriverDTO = require("./driverDTO.js");
const RouteDTO = require("./routeDTO.js");

module.exports = class BusDTO {
    constructor(bus) {
        if (bus._id !== undefined)
            if (!isValidObjectId(bus._id))
                console.log(`Invalid BusID for permit number ${bus.permitNumber}`);

        if (!Array.isArray(bus.seats))
            console.log(`Seats are not an array in BusID ${bus._id}`);


        this._id = isValidObjectId(bus._id) ? this._id = bus._id : null,
        this.permitNumber = String(bus.permitNumber),
        this.busNumber = String(bus.busNumber),
        this.seats = bus.seats,
        this.driver = bus.driver.ntc !== undefined ? new DriverDTO(bus.driver) : bus.driver,
        this.route = bus.route.source !== undefined ? new RouteDTO(bus.route) : bus.route
    }
}