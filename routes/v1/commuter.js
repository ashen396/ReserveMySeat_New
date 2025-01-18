const express = require("express");
const router = express.Router();
// const cachingMiddleware = require("../../middlewares/cachingMiddleware.js");
const BookingController = require("../../controllers/bookingController.js");
const UserController = require("../../controllers/userController.js");
const ScheduleController = require("../../controllers/scheduleController.js");
const BusController = require("../../controllers/busController.js");
const RouteController = require("../../controllers/routeController.js");

/**
 * @swagger
 * /api/commuter/v1/bookings/{id}:
 *   get:
 *     tags:
 *        - Commuter - Bookings
 *     summary: Retrieves all the buses
 *     description: Retrieves all the buses
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Passes the booking id
 *         required: true
 *         schema: 
 *             type: string
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "firstName": "First",
 *                   "lastName": "Last",
 *                   "nic": "000000000v",
 *                   "contact": "123456789v",
 *                   "username": "TestUser",
 *                   "password": "********"
 *                  }
 *               ]
 *       500:
 *         description: Server error
 * 
 */
router.get("/bookings/:id", BookingController.getBookingById);

/**
 * @swagger
 * /api/commuter/v1/bookings/{id}:
 *   post:
 *     tags:
 *        - Commuter - Bookings
 *     summary: Creates a new booking
 *     description: Creates a new booking
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Passes the booking id
 *         required: true
 *         schema: 
 *             type: string
 *     responses:
 *       200:
 *         description: Creates a new booking
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "firstName": "First",
 *                   "lastName": "Last",
 *                   "nic": "000000000v",
 *                   "contact": "123456789v",
 *                   "username": "TestUser",
 *                   "password": "********"
 *                  }
 *               ]
 *       500:
 *         description: Server error
 * 
 */
router.post("/bookings", BookingController.insertBooking);

/**
 * @swagger
 * /api/commuter/v1/bookings/confirm:
 *   post:
 *     tags:
 *        - Commuter - Bookings
 *     summary: Confirm Booking
 *     description: Confirms the booking as paid
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Passes the booking id
 *         required: true
 *         schema: 
 *             type: string
 *     responses:
 *       200:
 *         description: Creates a new booking
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "firstName": "First",
 *                   "lastName": "Last",
 *                   "nic": "000000000v",
 *                   "contact": "123456789v",
 *                   "username": "TestUser",
 *                   "password": "********"
 *                  }
 *               ]
 *       500:
 *         description: Server error
 * 
 */
router.post("/bookings/confirm", BookingController.confirmBooking);

/**
 * @swagger
 * /api/commuter/v1/buses:
 *   get:
 *     tags:
 *        - Commuter - Buses
 *     summary: Get All Buses
 *     description: Retrieves all the buses
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/buses', BusController.getAllBuses);

/**
 * @swagger
 * /api/commuter/v1/buses/{id}:
 *   get:
 *     tags:
 *        - Commuter - Buses
 *     summary: Get Bus By ID
 *     description: Retrieves all the buses
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Passes the booking id
 *         required: true
 *         schema: 
 *             type: string
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/buses/:id', BusController.getBusById);

/**
 * @swagger
 * /api/commuter/v1/routes:
 *   get:
 *     tags:
 *        - Commuter - Routes
 *     summary: Get All Routes
 *     description: Retrieves all the buses
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/routes', RouteController.getAllRoutes);

/**
 * @swagger
 * /api/commuter/v1/routes/{id}:
 *   get:
 *     tags:
 *        - Commuter - Buses
 *     summary: Get Route By ID
 *     description: Retrieves route by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Passes the booking id
 *         required: true
 *         schema: 
 *             type: string
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/routes/:id', RouteController.getRouteById);

// router.get('/schedules', cachingMiddleware, ScheduleController.getAllSchedules);
/**
 * @swagger
 * /api/commuter/v1/schedules:
 *   get:
 *     tags:
 *        - Commuter - Schedules
 *     summary: Get All Schedules
 *     description: Retrieves all the schedules
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/schedules', ScheduleController.getAllSchedules);

/**
 * @swagger
 * /api/commuter/v1/schedules/{id}:
 *   get:
 *     tags:
 *        - Commuter - Schedules
 *     summary: Get Schedule By ID
 *     description: Retrieves all the schedules
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/schedules/:id', ScheduleController.getScheduleById);

/**
 * @swagger
 * /api/commuter/v1/users/{id}:
 *   get:
 *     tags:
 *        - Commuter - Users
 *     summary: Get User By ID
 *     description: Retrieves all the schedules
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.get("/users/:id", UserController.getUserById);

/**
 * @swagger
 * /api/commuter/v1/users/{id}:
 *   post:
 *     tags:
 *        - Commuter - Users
 *     summary: Create New User
 *     description: Retrieves all the schedules
 *     responses:
 *       200:
 *         description: Fetches all the buses from the buses collection
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "_id": "67642e287edb4f1bec400f45", 
 *                   "permitNumber": "7015",
 *                   "busNumber": "ND-6038",
 *                   "seats": ["A1", "A2", "A3", "A4"] },
 *                   "driver": {
 *                      "_id": "676429711fa15b7a237067b5",
 *                      "nic": "123456789v",
 *                      "name": "Driver1",
 *                      "contact": "+94123456789"
 *                   },
 *                   "route": {
 *                   "_id": "67642c12fbe64d49d86f4520",
 *                   "source": "COLOMBO-11",
 *                   "destination": "TRINCOMALEE",
 *                   "distance": 266.7,
 *                   "price": 3000
 *                   }
 *               ]
 *       500:
 *         description: Server error
 */
router.post("/users", UserController.insertUser);

module.exports = router