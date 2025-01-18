const RouteService = require("../services/routeService.js");
const ResponseHandler = require("../utils/responseHandler.js");
const ErrorHandler = require("../utils/errorHandler.js");

module.exports = class RouteController {
    static async getAllRoutes(req, res) {
        try {
            if (Object.keys(req.query).length !== 0) {
                const _routeResult = await RouteService.getRoutesFiltered(req);
                new ResponseHandler(res, 200, "routes", _routeResult, _routeResult.length);
            }

            const routeResult = await RouteService.getAllRoutes();
            new ResponseHandler(res, 200, "routes", routeResult, routeResult.length);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async getRouteById(req, res) {
        try {
            const routeResult = await RouteService.getRouteById(req.params.id);
            new ResponseHandler(res, 200, "routes", routeResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async insertRoute(req, res) {
        try {
            const routeObj = new Object({
                source: req.body.source,
                destination: req.body.destination,
                distance: req.body.distance,
                price: req.body.price
            });

            const routeResult = await RouteService.createRoute(routeObj);
            new ResponseHandler(res, 201, "route", routeResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async updateRoute(req, res) {
        try {
            const routeObj = new Object(
                {
                    id: req.params.id,
                    source: req.body.source,
                    destination: req.body.destination,
                    distance: req.body.distance,
                    price: req.body.price
                });

            const routeResult = await RouteService.updateRoute(routeObj);
            new ResponseHandler(res, 204, "route", routeResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }

    static async deleteRoute(req, res) {
        try {
            const routeResult = await RouteService.deleteRoute(req.params.id);
            res.status(204).json(routeResult);
        } catch (error) {
            new ErrorHandler(500, error, res);
        }
    }
}