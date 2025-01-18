const memCache = require("memory-cache");
const etag = require("etag");
const ScheduleModel = require("../models/schedule.js");
const BusModel = require("../models/bus.js");
const RouteModel = require("../models/route.js");
const DriverModel = require("../models/driver.js");
const ScheduleDTO = require("../dtos/scheduleDTO.js");
const Queue = require("../utils/queueHandler.js");

module.exports = class ScheduleService {
    static async getAllSchedules() {
        try {

            //Fetching data from DB
            const scheduleResults = await ScheduleModel.find()
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                })

            //Data Transfer Object
            const scheduleDTOResults = scheduleResults.map((schedule) => new ScheduleDTO(schedule));

            //Generating ETag for caching
            // const etagID = etag(JSON.stringify(scheduleResults), {
            //     weak: true
            // }).toString()

            //Caching data
            // memCache.put("schedules", {
            //     etag: etagID,
            //     data: scheduleDTOResults
            // }, process.env.CACHE_TIME);

            //Return data
            // return {
            //     etagID: etagID,
            //     data: scheduleResults
            // };
            return scheduleDTOResults;
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get All Schedules Id Error!",
                "error": error.message
            };
        }
    }

    static async getSchedulesFiltered(req) {
        if (req.query.route !== undefined &&
            req.query.date !== undefined)
            return await filterByRouteIDDate(req.query.route, req.query.date);

        if (req.query.route !== undefined)
            return await filterSchedulesByRouteID(req.query.route);

        if (req.query.date !== undefined &&
            req.query.limit === undefined &&
            req.query.sort === undefined)
            return await filterByDate(req.query.date);

        if (req.query.date !== undefined &&
            req.query.limit !== undefined &&
            req.query.sort === undefined)
            return await filterByDateLimit(req.query.date, req.query.limit);

        if (req.query.date !== undefined &&
            req.query.limit === undefined &&
            req.query.sort !== undefined)
            return await filterByDateSort(req.query.date, req.query.sort);

        if (req.query.date !== undefined &&
            req.query.limit !== undefined &&
            req.query.sort !== undefined)
            return await filterByDateLimitSort(req.query.date, req.query.limit, req.query.sort);

        //Nested Functions
        async function filterByDate(date) {
            const _scheduleResults = await ScheduleModel.find()
                .where({ date: date })
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                });
            return _scheduleResults.map((schedule) => new ScheduleDTO(schedule));
        }

        async function filterByRouteIDDate(routeId, date) {
            const _scheduleResults = await ScheduleModel.find()
                .where({ route: routeId, date: new Date(date) })
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                });
            // return _scheduleResults.map((schedule) => new ScheduleDTO(schedule));
            return _scheduleResults;
        }

        async function filterByDateLimit(date, limit) {
            const _scheduleResults = await ScheduleModel.find()
                .where({ date: date })
                .limit(parseInt(limit))
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                });
            // return _scheduleResults.map((schedule) => new ScheduleDTO(schedule));
            return _scheduleResults;
        }

        async function filterByDateSort(date, sort) {
            const _scheduleResults = await ScheduleModel.find()
                .where({ date: date })
                .sort({
                    startTime: sort
                })
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                });
            // return _scheduleResults.map((schedule) => new ScheduleDTO(schedule));
            return _scheduleResults;
        }

        async function filterByDateLimitSort(date, limit, sort) {
            const _scheduleResults = await ScheduleModel.find()
                .where({ date: date })
                .limit(parseInt(limit))
                .sort({
                    startTime: sort
                })
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                });
            // return _scheduleResults.map((schedule) => new ScheduleDTO(schedule));
            return _scheduleResults;
        }

        async function filterSchedulesByRouteID(routeId) {
            const _scheduleResults = await ScheduleModel.find({ route: routeId })
                .populate({
                    path: "bus",
                    model: BusModel
                })
                .populate({
                    path: "route",
                    model: RouteModel
                })
            // return _scheduleResults.map((schedule) => new ScheduleDTO(schedule));
            return _scheduleResults;
        }
    }

    static async getScheduleById(id) {
        try {
            const scheduleResult = await ScheduleModel.findById({ _id: id })
                .populate({
                    path: "bus",
                    model: BusModel,
                    populate: [{
                        path: "driver",
                        model: DriverModel
                    },
                    {
                        path: "route",
                        model: RouteModel
                    }]
                })

            const scheduleJSON = scheduleResult.toJSON()
            scheduleJSON.seatsOnHold = Queue.bookingsOnHold(id)
            return new ScheduleDTO(scheduleJSON);
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get Schedule By Id Error!",
                "error": error.message
            };
        }
    }

    static async createSchedule(obj) {
        try {
            const scheduleDTO = new ScheduleDTO(obj);
            return await new ScheduleModel({
                bus: scheduleDTO.bus,
                date: scheduleDTO.date,
                startTime: scheduleDTO.startTime,
                endTime: scheduleDTO.endTime,
                bookings: scheduleDTO.bookings
            }).save();
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get Schedule By Id Error!",
                "error": error.message
            };
        }
    }

    static async updateSchedule(obj) {
        try {
            const scheduleDTO = new ScheduleDTO(obj);
            return await ScheduleModel.findByIdAndUpdate(
                { _id: obj.id },
                {
                    $set: {
                        bus: scheduleDTO.bus,
                        date: scheduleDTO.date,
                        startTime: scheduleDTO.startTime,
                        endTime: scheduleDTO.endTime,
                        route: scheduleDTO.route
                    },
                    $addToSet: { bookings: { $each: scheduleDTO.bookings } }
                });
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get Schedule By Id Error!",
                "error": error.message
            };
        }
    }

    static async deleteSchedule(id) {
        try {
            return await ScheduleModel.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get Schedule By Id Error!",
                "error": error.message
            };
        }
    }
}