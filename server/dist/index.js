"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const firstController_1 = require("./controllers/firstController");
const usersController_1 = require("./controllers/usersController");
const requestsController_1 = require("./controllers/requestsController");
const rolesController_1 = require("./controllers/rolesController");
const bamController_1 = require("./controllers/bamController");
const securityController_1 = require("./controllers/securityController");
const jobsController_1 = require("./controllers/jobsController");
const blocksController_1 = require("./controllers/blocksController");
const alarm_1 = require("./alarm");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT;
const loggerMiddleware = (request, response, next) => {
    console.log(`⚡️[server]: ${request.method} ${request.path}`);
    next();
};
app.use(loggerMiddleware);
app.use("/first", firstController_1.firstRouter);
app.use("/users", usersController_1.usersRouter);
app.use("/requests", requestsController_1.requestsRouter);
app.use("/roles", rolesController_1.rolesRouter);
app.use("/bam", bamController_1.bamRouter);
app.use("/security", securityController_1.securityRouter);
app.use("/jobs", jobsController_1.jobsRouter);
app.use("/blocks", blocksController_1.blocksRouter);
app.get('/', (req, res) => {
    res.send("alive");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
const alarmClock = (0, alarm_1.throwMesseges)();
