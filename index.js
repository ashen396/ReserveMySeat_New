//Import Libraries
const awsServerlessExpress = require('aws-serverless-express');
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

//Import Objects
const connectDB = require("./config/database.js");
const authRouter = require('./routes/v1/authRouter.js');
const rateLimiter = require("./middlewares/rateLimitMiddleware.js");
const authMiddleware = require("./middlewares/authMiddleware.js");
const swaggerSpec = require("./config/swagger.js");
const commmuterRouter = require("./routes/v1/commuter.js");
const ntcRouter = require("./routes/v1/ntc.js");
const operatorRouter = require("./routes/v1/operator.js");

//Express Initialisation
const app = express();

//Express Configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter());

//Open MongoDB Connection
connectDB();

//Token Generation
app.use('/api/auth', authRouter);

//Authorization Middleware
app.use(authMiddleware);

//Routing Configurations
app.use('/api/ntc/v1', ntcRouter);
app.use('/api/commuter/v1', commmuterRouter);
app.use('/api/operator/v1', operatorRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Server Initialisation
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};