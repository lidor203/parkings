import express, { Request, Response } from 'express';
import axios from 'axios';
import { changeMessegesTime } from './alarmController';
import { changePhoneToAlert } from './alarmController';
import { changeTimeToAlert } from './alarmController'


export const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.post('/getUsers', async (req: Request, res: Response) => {
    const users = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    res.status(200);
    res.json(users.data);
});

usersRouter.post('/deleteUser', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`);
    res.status(200);
    res.json("המשתמש נמחק בהצלחה!");
});

usersRouter.post('/newUser', async (req: Request, res: Response)  => {
    await axios.post(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
    {
        "ID" : req.body.userIDToCreate, 
        "name" : req.body.userNameToCreate,
        "phone" : req.body.userPhoneToCreate,
        "timeToAlert" : req.body.userTimeToAlertToCreate,
        "role" : req.body.userRoleToCreate,
        "carNumber" : req.body.userCarNumberToCreate,
        "leaveTime" : req.body.userLeaveTimeToCreate
    });
    res.status(200);
    res.json("המשתמש נוצר בהצלחה!");
});

usersRouter.post('/editUser', async (req: Request, res: Response)  => {
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`,
    {
        "ID" : req.body.userIDToUpdate, 
        "name" : req.body.userNameToUpdate, 
        "phone" : req.body.userPhoneToUpdate, 
        "leaveTime" : req.body.userLeaveTimeToUpdate,
        "timeToAlert" : req.body.userTimeToAlertToUpdate,
        "role" : req.body.userRoleToUpdate,
        "carNumber" : req.body.userCarNumberToUpdate
    }).then(() => {
        if (req.body.currentLeaveTime !== req.body.userLeaveTimeToUpdate){
            changeMessegesTime(req.body.phone, req.body.userLeaveTimeToUpdate);
        }

        if (req.body.currentPhone !== req.body.userPhoneToUpdate){
            changePhoneToAlert(req.body.currentPhone, req.body.userPhoneToUpdate);
        }

        if (req.body.currentTimeToAlert !== req.body.userTimeToAlertToUpdate){
            changeTimeToAlert(req.body.phone, req.body.currentTimeToAlert, req.body.userTimeToAlertToUpdate);
        }
    })
    .catch()
    .finally();
    res.status(200);
    res.json("הפרטים עודכנו בהצלחה!");
});

usersRouter.post('/getUserByCar', async (req: Request, res: Response)  => {
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${req.body.carNumber}\"`);
    res.status(200);
    res.json(user.data);
});

usersRouter.post('/getUserByID', async (req: Request, res: Response)  => {
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(user.data);
});

usersRouter.post('/changeLeaveTime', async (req: Request, res: Response)  => {
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`,
    {
        "leaveTime" : req.body.userLeaveTime
    }).then(() => {
        changeMessegesTime(req.body.blockedUserPhone, req.body.userLeaveTime);
    })
    .catch()
    .finally();
    res.status(200);
    res.json("שעת היציאה מהבסיס עודכנה בהצלחה!");
});