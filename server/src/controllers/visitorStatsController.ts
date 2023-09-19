import express, { Request, Response } from 'express';
import axios from 'axios';

export const visitorStatsRouter = express.Router();
visitorStatsRouter.use(express.json());

visitorStatsRouter.post('/getVisitorStats', async (req: Request, res: Response) => {
    const visitorStats = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requestsHistory.json`);
    res.status(200);
    res.json(visitorStats.data);
});