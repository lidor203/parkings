import express, { Request, Response } from 'express';
import axios from 'axios';

export const securityRouter = express.Router();
securityRouter.use(express.json());

securityRouter.post('/getSecurity', async (req: Request, res: Response) => {
    const security = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json`);
    res.status(200);
    res.json(security.data);
});

securityRouter.post('/deleteSecurity', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers/${req.body.key}.json`);
    res.status(200);
    res.json("חסימת האבטחה נמחקה בהצלחה!");
});

securityRouter.post('/newSecurity', async (req: Request, res: Response) => { 
    await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json",
    {
        "ID" : req.body.IDToCreate,
        "reason" : req.body.reasonToCreate
    });
    res.status(200);
    res.json("חסימת האבטחה נוצרה בהצלחה!");
});

securityRouter.post('/editSecurity', async (req: Request, res: Response)  => {
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers/${req.body.key}.json`,
    {
        "reason" : req.body.reasonToUpdate
    });
    res.status(200);
    res.json("חסימת האבטחה עודכנה בהצלחה!");
});

securityRouter.post('/getSecurityDisclaimerByID', async (req: Request, res: Response)  => {
    const securityDisclaimer = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(securityDisclaimer.data);    
});