const { rateLimit } = require("express-rate-limit");

module.exports = function rateLimitMiddleware() {
    return rateLimit({
        windowMs: 60000,
        limit: 50,
        message: "Too many requests!",
        handler: (_req, _res, _next) => {
            _res.status(429).send("Too many requests");
        }
    })
}