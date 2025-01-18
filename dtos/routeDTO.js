const { isValidObjectId } = require("mongoose");

module.exports = class RouteDTO {
    constructor(route) {
        if (route._id !== undefined)
            if (!isValidObjectId(route._id))
                console.log(`Invalid RouteID for source ${route.source} and destination ${route.destination}`);

        isValidObjectId(route._id) ? this._id = route._id : null,
        this.source = route.source,
        this.destination = route.destination,
        this.distance = route.distance,
        this.price = route.price
    }
}