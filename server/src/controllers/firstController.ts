import express, { Request, Response } from 'express';
import axios from 'axios';

export const firstRouter = express.Router();
firstRouter.use(express.json());

firstRouter.post('/login', async (req: Request, res: Response) => {  
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    if(JSON.stringify(user.data) === "{}"){
        res.status(404);
        res.json("שם המשתמש או הסיסמא אינם נכונים!")
    } else {
        const userPassword = req.body.password;
        let password;
        for (const key in user.data) {  
            password = user.data[key].password
          }
        if (userPassword !== password){
            res.status(401)
            res.json("שם המשתמש או הסיסמא אינם נכונים!");
        }
        else {
            res.status(200);
            res.json(user.data);
        } 
    }
});

firstRouter.post('/register', async (req: Request, res: Response) => {
    const userID = req.body.ID;
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${userID}\"`);
    if(JSON.stringify(user.data) !== "{}"){
        res.status(403);
        res.json("שם המשתמש כבר בשימוש");
    } else{
        await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        {
            "ID" : req.body.ID,
            "name" : req.body.fullName,
            "password" : req.body.password,
            "phone" : req.body.phone,
            "carNumber" : req.body.carNumber,
            "leaveTime" : req.body.leaveTime,
            "role" : "אורח"
        })
        res.status(200);
        res.json("המשתמש נוצר בהצלחה!");
    }
});