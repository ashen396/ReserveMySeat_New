module.exports = class ResponseHandler {
    constructor(res, statusCode, key, data, count) {
        res.status(statusCode).json({
            "status": "success",
            "data": {
                "code": statusCode,
                "count": count !== null ? count : null,
                [key]: data
            }
        });
    }
}