const { isValidObjectId, ObjectId } = require("mongoose");

module.exports = class DriverDTO {
    constructor(driver) {
        if (driver._id !== undefined)
            if (!isValidObjectId(driver._id))
                console.log(`Invalid DriverID for driver nic ${driver.nic}`);


        isValidObjectId(driver._id) ? this._id = driver._id : null,
        this.nic = String(driver.nic),
        this.name = String(driver.name),
        this.contact = String(driver.contact)
    }
}