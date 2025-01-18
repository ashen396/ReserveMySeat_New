const { isValidObjectId } = require("mongoose");
// const UserDTO = require("./userDTO");
// const ScheduleDTO = require("./scheduleDTO");

module.exports = class BookingDTO {
    constructor(booking) {
        if (booking._id !== undefined)
            if (!isValidObjectId(booking._id))
                console.log(`Invalid BookingID for user ${booking.user} and schedule ${booking.schedule}`);

        isValidObjectId(booking._id) ? this._id = booking._id : null,
        // this.user = new UserDTO(booking.user),
        this.user = booking.user,
        // this.schedule = new ScheduleDTO(booking.schedule),
        this.schedule = booking.schedule,
        this.seats = booking.seats,
        this.status = booking.status
    }
}