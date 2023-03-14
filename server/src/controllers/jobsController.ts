import express, { Request, Response } from 'express';
import axios from 'axios';

export const jobsRouter = express.Router();
jobsRouter.use(express.json());

jobsRouter.post('/getjobs', async (req: Request, res: Response) => {
    const jobs = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    res.status(200);
    res.json(jobs.data);
});

jobsRouter.post('/deleteJob', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`);
    res.status(200);
    res.json("תפקיד המשתמש נמחק בהצלחה!");
});

jobsRouter.post('/newJob', async (req: Request, res: Response) => { 
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`,
    {
        "role" : req.body.userRoleForJob
    });
    res.status(200);
    res.json("תפקיד המשתמש נוצר בהצלחה!");
});

jobsRouter.post('/editJob', async (req: Request, res: Response)  => {
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`,
    {
        "role" : req.body.roleToUpdate
    });
    res.status(200);
    res.json("תפקיד המשתמש עודכן בהצלחה!");
});

jobsRouter.post('/getRolesDescriptions', async (req: Request, res: Response) => {
    const rolesDescriptions = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles.json`);
    res.status(200);
    res.json(rolesDescriptions.data);
});