import express, { Request, Response } from 'express';
import axios from 'axios';

export const requestsRouter = express.Router();
requestsRouter.use(express.json());

requestsRouter.post('/getRequests', async (req: Request, res: Response) => {
    const requests = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json`);
    res.status(200);
    res.json(requests.data);
});

requestsRouter.post('/deleteRequest', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests/${req.body.key}.json`);
    res.status(200);
    res.json("בקשת הכניסה נמחקה בהצלחה!");
});

requestsRouter.post('/newRequest', async (req: Request, res: Response) => { 
    await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json",
    {
        "requesterID" : req.body.requesterID,
        "requesterName" : req.body.requesterName,
        "visitorName" : req.body.visitorName, 
        "visitorID" : req.body.visitorID, 
        "visitorPhone" : req.body.visitorPhone,
        "hostID" : req.body.hostID, 
        "hostName" : req.body.hostName, 
        "hostPhone" : req.body.hostPhone
    });
    res.status(200);
    res.json("בקשת הכניסה נוצרה בהצלחה!");
});

requestsRouter.post('/editRequest', async (req: Request, res: Response) => { 
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests/${req.body.key}.json`,
    {
        "requesterID" : req.body.requesterID,
        "requesterName" : req.body.requesterName,
        "visitorName" : req.body.visitorName, 
        "visitorID" : req.body.visitorID, 
        "visitorPhone" : req.body.visitorPhone, 
        "hostID" : req.body.hostID, 
        "hostName" : req.body.hostName, 
        "hostPhone" : req.body.hostPhone
    });
    res.status(200);
    res.json("בקשת הכניסה עודכנה בהצלחה!");
});

requestsRouter.post('/getRequestsByHostID', async (req: Request, res: Response)  => {
    const requests = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json?orderBy=\"hostID\"&equalTo=\"${req.body.hostID}\"`);
    res.status(200);
    res.json(requests.data);
});

requestsRouter.post('/getRequestsByVisitorID', async (req: Request, res: Response)  => {
    const requests = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json?orderBy=\"visitorID\"&equalTo=\"${req.body.visitorID}\"`);
    res.status(200);
    res.json(requests.data);
});

requestsRouter.post('/getRequestByVisitorID', async (req: Request, res: Response)  => {
    const request = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json?orderBy=\"visitorID\"&equalTo=\"${req.body.visitorID}\"`);
    res.status(200);  
    res.json(request.data);
});

requestsRouter.post('/deleteRequestByVisitorID', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests/${req.body.key}.json`);
    res.status(200);
    res.json("בקשת הכניסה נמחקה בהצלחה!");
});

requestsRouter.post('/insertRequestIntoHistory', async (req: Request, res: Response) => { 
    const nowTime = new Date();
    const entranceTime = nowTime.getHours().toString().padStart(2,'0') + ":" + nowTime.getMinutes().toString().padStart(2,'0');
    const entranceMonth = (nowTime.getMonth()+1) < 10 ? "0" + (nowTime.getMonth()+1).toString() : (nowTime.getMonth()+1).toString();
    const entranceDate = nowTime.getDate().toString() + "-" + entranceMonth + "-" + nowTime.getFullYear().toString();

    await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requestsHistory.json",
    {

        "entranceDay" : entranceDate,
        "entranceTime" : entranceTime,
        "requesterID" : req.body.requesterIDForInsert,
        "requesterName" : req.body.requesterNameForInsert,
        "visitorName" : req.body.visitorNameForInsert, 
        "visitorID" : req.body.visitorIDForInsert, 
        "visitorPhone" : req.body.visitorPhoneForInsert,
        "hostID" : req.body.hostIDForInsert, 
        "hostName" : req.body.hostNameForInsert, 
        "hostPhone" : req.body.hostPhoneForInsert
    });
    res.status(200);
    res.json("בקשת הכניסה נשמרה בהיסטוריה בהצלחה!");
});