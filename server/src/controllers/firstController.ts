import express, { Request, Response } from 'express';
import axios from 'axios';

export const firstRouter = express.Router();
firstRouter.use(express.json());

firstRouter.post('/login', async (req: Request, res: Response) => {  
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    if(JSON.stringify(user.data) === "{}"){
        res.status(404);
        res.json("אין משתמש רשום עם תעודת זהות זאת!")
    } 
    else {
        res.status(200);
        res.json(user.data);
    }
});

firstRouter.post('/register', async (req: Request, res: Response) => {
    const userID = req.body.ID;
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${userID}\"`);
    if(JSON.stringify(user.data) !== "{}"){
        res.status(403);
        res.json("שם המשתמש כבר בשימוש");
    } 
    else {
        await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        {
            "ID" : req.body.ID,
            "name" : req.body.fullName,
            "phone" : req.body.phone,
            "carNumber" : req.body.carNumber,
            "leaveTime" : req.body.leaveTime,
            "timeToAlert" : req.body.timeToAlert,
            "role" : "אורח"
        })
        res.status(200);
        res.json("המשתמש נוצר בהצלחה!");
    }
});