const ScheduleService = require("../services/scheduleService.js");
const ResponseHandler = require("../utils/responseHandler.js");
const ErrorHandler = require("../utils/errorHandler.js");

module.exports = class Schedule {
    static async getAllSchedules(req, res) {
        try {
            if (Object.keys(req.query).length !== 0) {
                const _schedulesFiltered = await ScheduleService.getSchedulesFiltered(req);
                // res.status(200).json(_schedulesFiltered);
                new ResponseHandler(res, 200, "schedules", _schedulesFiltered, _schedulesFiltered.length);
            }

            const schedules = await ScheduleService.getAllSchedules();
            // res.set('ETag', schedules.etagID);
            new ResponseHandler(res, 200, "schedules", schedules, schedules.length);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async getScheduleById(req, res) {
        try {
            const schedule = await ScheduleService.getScheduleById(req.params.id);
            // res.status(200).json(schedule);
            new ResponseHandler(res, 200, "schedules", schedule);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async insertSchedule(req, res) {
        try {
            const scheduleObj = new Object({
                bus: req.body.bus,
                date: req.body.date,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                route: req.body.route,
                bookings: req.body.bookings
            });

            const scheduleResult = await ScheduleService.createSchedule(scheduleObj);
            // res.status(201).json(scheduleResult);
            new ResponseHandler(res, 200, "schedules", scheduleResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async updateSchedule(req, res) {
        try {
            const scheduleObj = new Object(
                {
                    id: req.params.id,
                    bus: req.body.bus,
                    route: req.body.route,
                    date: req.body.date,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    bookings: req.body.bookings
                });

            const scheduleResult = await ScheduleService.updateSchedule(scheduleObj);
            // res.status(200).json(scheduleResult);
            new ResponseHandler(res, 204, "schedules", scheduleResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async deleteScheduleById(req, res) {
        try {
            const scheduleResult = await ScheduleService.deleteSchedule(req.params.id);
            // res.status(200).json(scheduleResult);
            new ResponseHandler(res, 204, "schedules", scheduleResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }
}