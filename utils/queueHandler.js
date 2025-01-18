const { ObjectId } = require("mongodb");
const BookingModel = require("../models/booking.js");
const PAY_EVENTS = require("../config/paymentEvents.js");

async function updateBookingById(booking) {
    return new Promise(async (resolve, reject) => {
        const result = await BookingModel.findByIdAndUpdate({ _id: booking.id },
            { $set: { status: booking.status } }
        );
        resolve(result);
    });
}

module.exports = class Queue {
    static queueArray = []
    static enqueue(obj) {
        if (this.queueArray.length === 0) {
            this.queueArray.push({
                scheduleId: obj.schedule,
                bookingsOnHold: [{
                    bookingId: obj._id,
                    user: obj.user,
                    seats: obj.seats
                }]
            })
        } else {
            this.queueArray.forEach((queue, index, array) => {
                if (new ObjectId(queue.scheduleId).equals(obj.schedule)) {
                    this.queueArray[index].bookingsOnHold.push({
                        bookingId: obj._id,
                        user: obj.user,
                        seats: obj.seats
                    })
                } else {
                    this.queueArray.push({
                        scheduleId: obj.schedule,
                        bookingsOnHold: [{
                            bookingId: obj._id,
                            user: obj.user,
                            seats: obj.seats
                        }]
                    })
                }
            })
        }

        return {
            id: obj.schedule,
            bookingId: obj._id,
            bookings: obj.seats
        }
    }

    static async addToDequeue(result) {
        return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            this.dequeue({
                schedule: result.schedule,
                bookingId: result._id,
            });

            updateBookingById({
                id: result._id,
                status: PAY_EVENTS.TIMEOUT
            }).then(() => {
                // clearTimeout(timer)
                resolve(true)
            });
            // .then(() => clearTimeout(timer))
            // resolve(true);
        // }, process.env.PAY_GATE_TIMEOUT || 720000);
    }, 60000);
        // }, 10000);
        })
    }

    static dequeue(obj) {
        if (this.queueArray !== null) {
            this.queueArray.forEach((schedule, sIndex, sarray) => {
                if (new ObjectId(schedule.scheduleId).equals(obj.schedule)) {
                    schedule.bookingsOnHold.forEach((element, eIndex, elArr) => {
                        if (element !== null) {
                            if (new ObjectId(element.bookingId).equals(obj.bookingId)) {
                                this.queueArray[sIndex].bookingsOnHold[eIndex] = null
                            }
                        }
                        // console.log(this.queueArray[sIndex])
                    })
                }
            })
        }
    }

    static bookingsOnHold(scheduleId) {
        const seatsOnHold = []
        if (this.queueArray !== null) {
            this.queueArray.forEach((schedule, index, array) => {
                if (new ObjectId(schedule.scheduleId).equals(scheduleId)) {
                    schedule.bookingsOnHold.forEach(element => {
                        if (element !== null)
                            element.seats.forEach((el) => {
                                seatsOnHold.push(el)
                            })
                    });
                }
            })
        }
        return seatsOnHold;
    }
}

exports.handler = module.exports.addToDequeue;