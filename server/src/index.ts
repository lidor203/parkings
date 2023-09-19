import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { firstRouter } from './controllers/firstController';
import { usersRouter } from './controllers/usersController';
import { requestsRouter } from './controllers/requestsController';
import { rolesRouter } from './controllers/rolesController';
import { bamRouter } from './controllers/bamController';
import { securityRouter } from './controllers/securityController';
import { jobsRouter } from './controllers/jobsController';
import { blocksRouter } from './controllers/blocksController';
import { visitorStatsRouter } from './controllers/visitorStatsController';
import { throwMesseges } from './alarm';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

const loggerMiddleware = (request: express.Request, response: express.Response, next: () => void) => {
  console.log(`⚡️[server]: ${request.method} ${request.path}`);
  next();
}

app.use(loggerMiddleware);

app.use("/first", firstRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);
app.use("/roles", rolesRouter);
app.use("/bam", bamRouter);
app.use("/security", securityRouter);
app.use("/jobs", jobsRouter);
app.use("/blocks", blocksRouter);
app.use("/visitorStats", visitorStatsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send("alive");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const alarmClock = throwMesseges();
