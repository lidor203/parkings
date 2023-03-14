import express, { Request, Response } from 'express';
import axios from 'axios';

export const rolesRouter = express.Router();
rolesRouter.use(express.json());

rolesRouter.post('/getroles', async (req: Request, res: Response) => {
    const roles = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles.json`);
    res.status(200);
    res.json(roles.data);
});

rolesRouter.post('/deleteRole', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles/${req.body.key}.json`);
    res.status(200);
    res.json("התפקיד נמחק בהצלחה!");
});

rolesRouter.post('/editRole', async (req: Request, res: Response)  => {
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles/${req.body.key}.json`,
    {
        "value" : req.body.valueToUpdate
    });
    res.status(200);
    res.json("התפקיד עודכן בהצלחה!");
});