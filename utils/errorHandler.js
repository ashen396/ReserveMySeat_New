module.exports = class ErrorHandler{
    constructor(statusCode, error, res) {
        res.status(statusCode).json({
            "status": "error",
            "error": {
                "code": statusCode,
                "path": "NTC",
                "details": error
            }
        });
    }
}