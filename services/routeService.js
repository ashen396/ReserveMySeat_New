const RouteModel = require("../models/route.js");
const RouteDTO = require("../dtos/routeDTO.js");
// const memCache = require("memory-cache");

module.exports = class RouteService {
    static async getAllRoutes() {
        try {
            const routeResults = await RouteModel.find();
            // memCache.put("routes", routeDTO, process.env.CACHE_TIME);
            return routeResults.map((_route) => new RouteDTO(_route));
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get All Routes Error!",
                "error": error.message
            };
        }
    }

    static async getRoutesFiltered(req) {
        //Filter by source and destination
        if (req.query.source !== undefined &&
            req.query.destination !== undefined &&
            req.query.limit === undefined &&
            req.query.sort === undefined)
            return await filterbyLocation(req.query.source, req.query.destination);

        //Filter by source, destination and limit
        if (req.query.source !== undefined &&
            req.query.destination !== undefined &&
            req.query.limit !== undefined &&
            req.query.sort === undefined)
            return await filterbyLocationLimit(req.query.source, req.query.destination, req.query.limit);

        //Filter by source, destination, limit and sort
        if (req.query.source !== undefined &&
            req.query.destination !== undefined &&
            req.query.limit !== undefined &&
            req.query.sort !== undefined)
            return await filterbyLocationLimitSort(req.query.source, req.query.destination, req.query.limit, req.query.sort);

        //Nested Functions
        async function filterbyLocation(source, destination) {
            const _routeFiltered = await RouteModel.find()
                .where({
                    source: source,
                    destination: destination
                });
            // return _routeFiltered.map((route) => new RouteDTO(route));
            return _routeFiltered;
        }

        async function filterbyLocationLimit(source, destination, limit) {
            const _routeFiltered = await RouteModel.find()
                .where({
                    source: source,
                    destination: destination
                })
                .limit(parseInt(limit));
            // return _routeFiltered.map((route) => new RouteDTO(route));
            return _routeFiltered;
        }

        async function filterbyLocationLimitSort(source, destination, limit, sort) {
            const _routeFiltered = await RouteModel.find()
                .where({
                    source: source,
                    destination: destination
                })
                .limit(parseInt(limit))
                .sort({
                    source: sort
                });
            // return _routeFiltered.map((route) => new RouteDTO(route));
            return _routeFiltered;
        }
    }

    static async getRouteById(id) {
        try {
            const routeResult = await RouteModel.findById({ _id: id });
            return new RouteDTO(routeResult);
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Get Route By Id Error!",
                "error": error.message
            };
        }
    }

    static async createRoute(obj) {
        try {
            const routeDTO = new RouteDTO(obj);
            const routeModel = new RouteModel(routeDTO);
            const routeResult = await routeModel.save();
            return routeResult;
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Create New Route Error!",
                "error": error.message
            };
        }
    }

    static async updateRoute(obj) {
        try {
            const routeDTO = new RouteDTO(obj);
            return await RouteModel.findByIdAndUpdate(
                { _id: routeDTO._id },
                {
                    source: routeDTO.source,
                    destination: routeDTO.destination,
                    distance: routeDTO.distance,
                    price: routeDTO.price
                });
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Update Route Error!",
                "error": error.message
            };
        }
    }

    static async deleteRoute(id) {
        try {
            return await RouteModel.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw {
                "name": error.name,
                "message": "Delete Route Error!",
                "error": error.message
            };
        }
    }
}