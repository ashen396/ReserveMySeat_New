//Express configurations
const express = require("express");
const router = express.Router();
const DriverController = require("../../controllers/driverController.js");
const BusController = require("../../controllers/busController.js");
const RouteController = require("../../controllers/routeController.js");
const ScheduleController = require("../../controllers/scheduleController.js");
// const BusValidator = require("../../middlewares/validators/busValidator");
// const cachingMiddleware = require("../../middlewares/cachingMiddleware.js");

/**
 * @swagger
 * /api/ntc/v1/drivers:
 *   get:
 *     tags:
 *        - NTC - Drivers
 *     summary: Get All Drivers
 *     description: Retrieves all the drivers
 *     responses:
 *       200:
 *         description: Fetching drivers completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               [{
 *                  "_id": "676428e61fa15b7a237067b1",
 *                  "nic": "000000000v",
 *                  "name": "Driver1",
 *                  "contact": "1231231231"
 *               }, {
 *                  "_id": "676428e61fa15b7a237067b1",
 *                  "nic": "111111111v",
 *                  "name": "Driver2",
 *                  "contact": "1231231231"
 *               }]
 *       500:
 *         description: Server error
 * 
 */
router.get('/drivers', DriverController.getAllDrivers);

/**
 * @swagger
 * /api/ntc/v1/drivers/{id}:
 *   get:
 *     tags:
 *        - NTC - Drivers
 *     summary: Get Driver By ID
 *     description: Retrieves the driver by the given ID
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the driver to retrieve
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       200:
 *         description: Fetching driver by id completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  "_id": "676428e61fa15b7a237067b1",
 *                  "nic": "000000000v",
 *                  "name": "Driver1",
 *                  "contact": "1231231231"
 *               }
 *       500:
 *         description: Server error
 * 
 */
router.get('/drivers/:id', DriverController.getDriverById);

/**
 * @swagger
 * /api/ntc/v1/drivers:
 *   post:
 *     tags:
 *        - NTC - Drivers
 *     summary: Create New Driver
 *     description: Insert a new driver to the collection
 *     parameters:
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      nic:
 *                          type: string
 *                          example: "000000000v"
 *                      name:
 *                           type: string
 *                           example: "Driver001"
 *                      contact:
 *                           type: string
 *                           example: "1234567890"
 *     responses:
 *       201:
 *         description: Inserted driver successfully.
 *       500:
 *         description: Server error
 * 
 */
router.post('/drivers', DriverController.insertDriver);

/**
 * @swagger
 * /api/ntc/v1/drivers/{id}:
 *   patch:
 *     tags:
 *        - NTC - Drivers
 *     summary: Update Driver
 *     description: Change the existing details of the driver
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the driver to update
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      nic:
 *                          type: string
 *                          example: "000000000v"
 *                      name:
 *                           type: string
 *                           example: "Driver001"
 *                      contact:
 *                           type: string
 *                           example: "1234567890"
 *     responses:
 *       201:
 *         description: Updated driver successfully.
 *       500:
 *         description: Server error
 * 
 */
router.patch('/drivers/:id', DriverController.updateDriver);

/**
 * @swagger
 * /api/ntc/v1/drivers/{id}:
 *   delete:
 *     tags:
 *        - NTC - Drivers
 *     summary: Delete Driver
 *     description: Delete the driver from the collection
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the driver to delete
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       201:
 *         description: Deleted driver successfully.
 *       500:
 *         description: Server error
 * 
 */
router.delete('/drivers/:id', DriverController.deleteDriver);

/**
 * @swagger
 * /api/ntc/v1/buses:
 *   get:
 *     tags:
 *        - NTC - Buses
 *     summary: Get All Buses
 *     description: Retrieves all the buses
 *     responses:
 *       200:
 *         description: Fetching buses completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               [{
 *                 "_id": "678893ade68b617cfc38700c",
 *                  "permitNumber": "0001",
 *                  "busNumber": "NA-0001",
 *                  "seats": [
 *                      [
 *                          "A1",
 *                          "A2"
 *                      ],
 *                      [
 *                          "B1"
 *                      ]
 *                  ],
 *                  "driver": {
 *                      "_id": "6788973626f27c620221ee82",
 *                      "nic": "444444444v",
 *                      "name": "Driver5",
 *                      "contact": "5555555555",
 *                      "__v": 0
 *                  },
 *                  "route": {
 *                      "_id": "67642c3ffbe64d49d86f4522",
 *                      "source": "EMBILIPITIYA",
 *                      "destination": "VAVUNIA",
 *                      "distance": 452.5,
 *                      "price": 5000
 *                  }
 *              }]
 *       500:
 *         description: Server error
 * 
 */
router.get('/buses', BusController.getAllBuses);

/**
 * @swagger
 * /api/ntc/v1/buses/{id}:
 *   get:
 *     tags:
 *        - NTC - Buses
 *     summary: Get Bus By ID
 *     description: Retrieves the bus by the given ID
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the driver to retrieve
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       200:
 *         description: Fetching bus by id completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               [{
 *                 "_id": "678893ade68b617cfc38700c",
 *                  "permitNumber": "0001",
 *                  "busNumber": "NA-0001",
 *                  "seats": [
 *                      [
 *                          "A1",
 *                          "A2"
 *                      ],
 *                      [
 *                          "B1"
 *                      ]
 *                  ],
 *                  "driver": {
 *                      "_id": "6788973626f27c620221ee82",
 *                      "nic": "444444444v",
 *                      "name": "Driver5",
 *                      "contact": "5555555555",
 *                      "__v": 0
 *                  },
 *                  "route": {
 *                      "_id": "67642c3ffbe64d49d86f4522",
 *                      "source": "EMBILIPITIYA",
 *                      "destination": "VAVUNIA",
 *                      "distance": 452.5,
 *                      "price": 5000
 *                  }
 *              }]
 *       500:
 *         description: Server error
 * 
 */
router.get('/buses/:id', BusController.getBusById);

/**
 * @swagger
 * /api/ntc/v1/buses:
 *   post:
 *     tags:
 *        - NTC - Buses
 *     summary: Create New Bus
 *     description: Insert a new bus to the collection
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      permitNumber:
 *                          type: string
 *                          example: "0001"
 *                      busNumber:
 *                           type: string
 *                           example: "NA-0001"
 *                      seats:
 *                           type: array
 *                           example: [["A1","A2","A3","A4"], ["B1","B2","B3","B4"]]
 *                      driver:
 *                          type: string
 *                          example: "676428e61fa15b7a237067b1"
 *                      route:
 *                          type: string
 *                          example: "676428e61fa15b7a237067b1"
 *     responses:
 *       201:
 *         description: Inserted bus successfully.
 *       500:
 *         description: Server error
 * 
 */
router.post('/buses', BusController.insertBus);

/**
 * @swagger
 * /api/ntc/v1/buses/{id}:
 *   patch:
 *     tags:
 *        - NTC - Buses
 *     summary: Update Bus
 *     description: Change the existing details of the bus
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the bus to update
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      permitNumber:
 *                          type: string
 *                          example: "0001"
 *                      busNumber:
 *                           type: string
 *                           example: "NA-0001"
 *                      seats:
 *                           type: array
 *                           example: [["A1","A2","A3","A4"], ["B1","B2","B3","B4"]]
 *                      driver:
 *                          type: string
 *                          example: "676428e61fa15b7a237067b1"
 *                      route:
 *                          type: string
 *                          example: "676428e61fa15b7a237067b1"
 *     responses:
 *       201:
 *         description: Updated bus successfully.
 *       500:
 *         description: Server error
 * 
 */
router.patch('/buses/:id', BusController.updateBus);

/**
 * @swagger
 * /api/ntc/v1/buses/{id}:
 *   delete:
 *     tags:
 *        - NTC - Buses
 *     summary: Delete Bus
 *     description: Delete the bus from the collection
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the bus to delete
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       201:
 *         description: Deleted bus successfully
 *       500:
 *         description: Server error
 * 
 */
router.delete('/buses/:id', BusController.deleteBus);

/**
 * @swagger
 * /api/ntc/v1/routes:
 *   get:
 *     tags:
 *        - NTC - Routes
 *     summary: Get All Routes
 *     description: Retrieves all the routes
 *     responses:
 *       200:
 *         description: Fetching routes completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               [{
 *                 "_id": "67642c12fbe64d49d86f4520",
 *                 "source": "COLOMBO-11",
 *                 "destination": "TRINCOMALEE",
 *                 "distance": 266.7,
 *                 "price": 3000
 *                },
 *                {
 *                 "_id": "67642c3ffbe64d49d86f4522",
 *                 "source": "EMBILIPITIYA",
 *                 "destination": "VAVUNIA",
 *                 "distance": 452.5,
 *                 "price": 5000
 *               }]
 *       500:
 *         description: Server error
 * 
 */
router.get('/routes', RouteController.getAllRoutes);

/**
 * @swagger
 * /api/ntc/v1/routes/{id}:
 *   get:
 *     tags:
 *        - NTC - Routes
 *     summary: Get Route By ID
 *     description: Retrieves the route by the given ID
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the route to retrieve
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       200:
 *         description: Fetching route by id completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               [{
 *                 "_id": "67642c12fbe64d49d86f4520",
 *                 "source": "COLOMBO-11",
 *                 "destination": "TRINCOMALEE",
 *                 "distance": 266.7,
 *                 "price": 3000
 *                }]
 *       500:
 *         description: Server error
 * 
 */
router.get('/routes/:id', RouteController.getRouteById);

/**
 * @swagger
 * /api/ntc/v1/routes:
 *   post:
 *     tags:
 *        - NTC - Routes
 *     summary: Create New Route
 *     description: Insert a new route to the collection
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      source:
 *                          type: string
 *                          example: "EMBILIPITIYA"
 *                      destination:
 *                           type: string
 *                           example: "VAVUNIA"
 *                      distance:
 *                           type: number
 *                           example: 266.7
 *                      price:
 *                          type: number
 *                          example: 3000
 *     responses:
 *       201:
 *         description: Inserted route successfully.
 *       500:
 *         description: Server error
 * 
 */
router.post('/routes', RouteController.insertRoute);

/**
 * @swagger
 * /api/ntc/v1/routes/{id}:
 *   patch:
 *     tags:
 *        - NTC - Routes
 *     summary: Update Route
 *     description: Change the existing details of the route
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the route to update
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      source:
 *                          type: string
 *                          example: "EMBILIPITIYA"
 *                      destination:
 *                           type: string
 *                           example: "VAVUNIA"
 *                      distance:
 *                           type: number
 *                           example: 266.7
 *                      price:
 *                          type: number
 *                          example: 3000
 *     responses:
 *       201:
 *         description: Updated route successfully.
 *       500:
 *         description: Server error
 * 
 */
router.patch('/routes/:id', RouteController.updateRoute);

/**
 * @swagger
 * /api/ntc/v1/routes/{id}:
 *   delete:
 *     tags:
 *        - NTC - Routes
 *     summary: Delete Route
 *     description: Delete the route from the collection
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the route to delete
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       201:
 *         description: Deleted route successfully
 *       500:
 *         description: Server error
 * 
 */
router.delete('/routes/:id', RouteController.deleteRoute);

/**
 * @swagger
 * /api/ntc/v1/schedules:
 *   get:
 *     tags:
 *        - NTC - Schedules
 *     summary: Get All Schedules
 *     description: Retrieves all the schedules
 *     responses:
 *       200:
 *         description: Fetching schedules completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               [{
 *                 "_id": "6789d842e1bb14c3c54f68dc",
 *                 "bus": {
 *                         "_id": "678893ade68b617cfc38700c",
 *                         "permitNumber": "0001",
 *                         "busNumber": "NA-0001",
 *                         "seats": [
 *                                   ["A1","A2","A3","A4"],
 *                                   ["B1","B2","B3","B4"]
 *                                  ],
 *                         "driver": {
 *                                     "_id": "6788973626f27c620221ee82",
 *                                     "nic": "444444444v",
 *                                     "name": "Driver5",
 *                                     "contact": "5555555555",
 *                                     "__v": 0
 *                                   },
 *                         "route": {
 *                                    "_id": "67642c3ffbe64d49d86f4522",
 *                                     "source": "EMBILIPITIYA",
 *                                     "destination": "VAVUNIA",
 *                                     "distance": 452.5,
 *                                     "price": 5000,
 *                                     "__v": 0
 *                                    },
 *                     "__v": 0
 *                     },
 *                     "date": "2024-12-20T00:00:00.000Z",
 *                     "startTime": "2024-12-20T10:00:00.000Z",
 *                     "endTime": "2024-12-20T12:00:00.000Z",
 *                     "bookings": ["A1","A2","A3"]
 *              }]
 *       500:
 *         description: Server error
 * 
 */
router.get('/schedules', ScheduleController.getAllSchedules);

/**
 * @swagger
 * /api/ntc/v1/schedules/{id}:
 *   get:
 *     tags:
 *        - NTC - Schedules
 *     summary: Get Schedule By ID
 *     description: Retrieves the schedule by the given ID
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the schedule to retrieve
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       200:
 *         description: Fetching schedules completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "_id": "6789d842e1bb14c3c54f68dc",
 *                 "bus": {
 *                         "_id": "678893ade68b617cfc38700c",
 *                         "permitNumber": "0001",
 *                         "busNumber": "NA-0001",
 *                         "seats": [
 *                                   ["A1","A2","A3","A4"],
 *                                   ["B1","B2","B3","B4"]
 *                                  ],
 *                         "driver": {
 *                                     "_id": "6788973626f27c620221ee82",
 *                                     "nic": "444444444v",
 *                                     "name": "Driver5",
 *                                     "contact": "5555555555",
 *                                     "__v": 0
 *                                   },
 *                         "route": {
 *                                    "_id": "67642c3ffbe64d49d86f4522",
 *                                     "source": "EMBILIPITIYA",
 *                                     "destination": "VAVUNIA",
 *                                     "distance": 452.5,
 *                                     "price": 5000,
 *                                     "__v": 0
 *                                    },
 *                     "__v": 0
 *                     },
 *                     "date": "2024-12-20T00:00:00.000Z",
 *                     "startTime": "2024-12-20T10:00:00.000Z",
 *                     "endTime": "2024-12-20T12:00:00.000Z",
 *                     "bookings": ["A1","A2","A3"]
 *              }
 *       500:
 *         description: Server error
 * 
 */
router.get('/schedules/:id', ScheduleController.getScheduleById);

/**
 * @swagger
 * /api/ntc/v1/schedules:
 *   post:
 *     tags:
 *        - NTC - Schedules
 *     summary: Create New Schedule
 *     description: Insert a new schedule to the collection
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      bus:
 *                          type: string
 *                          example: "676428e61fa15b7a237067b1"
 *                      date:
 *                           type: date
 *                           example: "2025-01-01T00:00:00.000Z"
 *                      startTime:
 *                           type: date
 *                           example: "2025-01-01T08:30:00.000Z"
 *                      endTime:
 *                          type: date
 *                          example: "2025-01-01T15:30:00.000Z"
 *                      bookings:
 *                          type: array
 *                          example: ["A1","A2"]
 *                          
 *     responses:
 *       201:
 *         description: Inserted schedule successfully.
 *       500:
 *         description: Server error
 * 
 */
router.post('/schedules', ScheduleController.insertSchedule);

/**
 * @swagger
 * /api/ntc/v1/schedules/{id}:
 *   patch:
 *     tags:
 *        - NTC - Schedules
 *     summary: Update Schedule
 *     description: Change the existing details of the schedule
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the schedule to update
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     requestBody:
 *         required: true
 *         content: 
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                      bus:
 *                          type: string
 *                          example: "676428e61fa15b7a237067b1"
 *                      date:
 *                           type: date
 *                           example: "2025-01-01T00:00:00.000Z"
 *                      startTime:
 *                           type: date
 *                           example: "2025-01-01T08:30:00.000Z"
 *                      endTime:
 *                          type: date
 *                          example: "2025-01-01T15:30:00.000Z"
 *                      bookings:
 *                          type: array
 *                          example: ["A1","A2"]
 *                          
 *     responses:
 *       201:
 *         description: Updated schedule successfully.
 *       500:
 *         description: Server error
 * 
 */
router.patch('/schedules/:id', ScheduleController.updateSchedule);

/**
 * @swagger
 * /api/ntc/v1/schedules/{id}:
 *   delete:
 *     tags:
 *        - NTC - Schedules
 *     summary: Delete Schedule
 *     description: Delete the schedule from the collection
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the schedule to delete
 *       schema:
 *         type: string
 *         example: "676428e61fa15b7a237067b1"
 *     responses:
 *       201:
 *         description: Deleted schedule successfully
 *       500:
 *         description: Server error
 * 
 */
router.delete('/schedules/:id', ScheduleController.deleteScheduleById);

router.all('/*', (req, res) => res.status(404).json({ "Message": "404 Page Not Found!" }))

module.exports = router;