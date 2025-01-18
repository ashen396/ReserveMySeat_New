const BookingModel = require("../models/booking.js");
const UserModel = require("../models/user.js");
const ScheduleModel = require("../models/schedule.js");
const BookingDTO = require("../dtos/bookingDTO.js");
const Queue = require("../utils/queueHandler.js");
const ScheduleService = require("../services/scheduleService.js");
const PAY_EVENTS = require("../config/paymentEvents.js");

// async function updateBookingById(booking) {
//     return new Promise(async (resolve, reject) => {
//         const result = await BookingModel.findByIdAndUpdate({ _id: booking.id },
//             { $set: { status: booking.status } }
//         );
//         resolve(result);
//     });
// }

module.exports = class BookingService {
    static async getBookingById(id) {
        const bookingResult = await BookingModel.findById(id)
            .populate({
                path: "user",
                model: UserModel
            })
            .populate({
                path: "schedule",
                model: ScheduleModel
            })
        return new BookingDTO(bookingResult);
    }

    static async createBooking(obj) {
        const bookingDTO = new BookingDTO(obj);
        let result = null

        result = await new BookingModel({
            user: bookingDTO.user,
            schedule: bookingDTO.schedule,
            seats: bookingDTO.seats
        }).save();

        if (result !== null) {
            const scheduleObj = Queue.enqueue(result);

            if (scheduleObj !== undefined) {
                Queue.addToDequeue(result);
                // const timer = setTimeout(() => {
                //     Queue.dequeue({
                //         schedule: result.schedule,
                //         bookingId: result._id,
                //     });

                //     updateBookingById({
                //         id: result._id,
                //         status: PAY_EVENTS.TIMEOUT
                //     }).then(() => clearTimeout(timer))
                // }, process.env.PAY_GATE_TIMEOUT || 720000);

                return result;
            }
        }
    }

    static async confimBooking(bookingId) {
        try {
            // await updateBookingById({
            //     id: bookingId,
            //     status: PAY_EVENTS.COMPLETED,
            // })
            // .then(async (result) => {
            //     Queue.dequeue({
            //         schedule: result.schedule,
            //         bookingId: result._id
            //     })

            // await ScheduleService.updateSchedule({
            //     id: result.schedule,
            //     bookings: result.seats
            // })
            // .then(() => clearTimeout(timer))
            // });

            const bookingResult = await BookingModel.findByIdAndUpdate(
                { _id: bookingId },
                {
                    $set: {
                        status: PAY_EVENTS.COMPLETED
                    }
                }).then(async (result) => {
                    Queue.dequeue({
                        schedule: result.schedule,
                        bookingId: result._id
                    })

                    await ScheduleService.updateSchedule({
                        id: result.schedule,
                        bookings: result.seats
                    })
                });

            return bookingResult;
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Confirm Booking Error!",
                "error": error.message
            };
        }
    }
}