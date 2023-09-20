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
    const nowTime = new Date();
    const month = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
    const date = nowTime.getDate().toString() + "-" + month + "-" + nowTime.getFullYear().toString();

    await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json",
    {
        "ID" : req.body.IDToCreate,
        "name" : req.body.nameToCreate,
        "reason" : req.body.reasonToCreate,
        "date" : date
    });
    res.status(200);
    res.json("חסימת האבטחה נוצרה בהצלחה!");
});

securityRouter.post('/editSecurity', async (req: Request, res: Response)  => {
    const nowTime = new Date();
    const month = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
    const date = nowTime.getDate().toString() + "-" + month + "-" + nowTime.getFullYear().toString();

    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers/${req.body.key}.json`,
    {
        "name" : req.body.disclaimedNameToUpadte, 
        "reason" : req.body.disclaimedReasonToUpdate,
        "date" : date
    });
    res.status(200);
    res.json("חסימת האבטחה עודכנה בהצלחה!");
});

securityRouter.post('/getSecurityDisclaimerByID', async (req: Request, res: Response)  => {
    const securityDisclaimer = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(securityDisclaimer.data);    
});