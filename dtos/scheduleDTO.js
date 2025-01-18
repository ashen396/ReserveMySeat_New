const { isValidObjectId } = require("mongoose");
const BusDTO = require("./busDTO.js");

module.exports = class ScheduleDTO {
    constructor(schedule) {
        if (schedule._id !== undefined)
            if (!isValidObjectId(schedule._id))
                console.log(`Invalid ScheduleID for BusID ${schedule.bus}`);

        isValidObjectId(schedule._id) ? this._id = schedule._id : null,
        schedule.bus !== undefined ? this.bus = schedule.bus : null,
        schedule.route !== undefined ? this.route = schedule.route : null,
        schedule.date !== undefined ? this.date = schedule.date : null,
        schedule.startTime !== undefined ? this.startTime = schedule.startTime : null,
        schedule.endTime !== undefined ? this.endTime = schedule.endTime : null,
        schedule.bookings !== undefined ? this.bookings = schedule.bookings : null
        schedule.seatsOnHold !== undefined ? this.seatsOnHold = schedule.seatsOnHold : null
    }
}