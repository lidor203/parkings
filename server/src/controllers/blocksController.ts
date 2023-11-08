import express, { Request, Response } from 'express';
import axios from 'axios';
import { addToAlarm } from '../controllers/alarmController';
import { removeFromAlarm } from '../controllers/alarmController';
import { changeMessegesTime } from '../controllers/alarmController';

export const blocksRouter = express.Router();
blocksRouter.use(express.json());

blocksRouter.post('/getBlocks', async (req: Request, res: Response) => {
    const blocks = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json`);
    res.status(200);
    res.json(blocks.data);
});

blocksRouter.post('/newBlock', async (req: Request, res: Response) => {
    let isBlcokExist = false;
    let messege: any = "החסימה כבר רשומה במאגר!";
    const blockerCarNumber = req.body.blockerCarNumber;
    const blockedCarNumber = req.body.blockedCarNumber;
    const blocks = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json?orderBy=\"blockerCarNumber\"&equalTo=\"${blockerCarNumber}\"`);
    
    for (const key in blocks.data) {     
        if (blocks.data[key]["blockedCarNumber"] === blockedCarNumber) {
            isBlcokExist = true;
            res.status(201);
            break;
        }
    } 

    if (!(isBlcokExist)) {
        await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json",
        {
            "blockerCarNumber": blockerCarNumber,
            "blockedCarNumber": blockedCarNumber
        }).then(async () => { messege = await addToAlarm(blockerCarNumber, blockedCarNumber); })
        .catch()
        .finally();
        res.status(200); 
    }  

    res.json(messege);
});

blocksRouter.post('/deleteBlock', async (req: Request, res: Response)  => {  
    const blocks = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json?orderBy=\"blockerCarNumber\"&equalTo=\"${req.body.userCarNumber}\"`);
    for (const key in blocks.data) {
        await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks/${key}.json`);
    }

    removeFromAlarm(req.body.userPhone);
    res.status(200);
    res.json("החסימות נמחקו בהצלחה!");
});


blocksRouter.post('/changeAlarmMessegesToNewTime', async (req: Request, res: Response)  => {  
    changeMessegesTime(req.body.blockedUserPhone, req.body.newLeaveTime);
    res.status(200);
    res.json("שינוי זמן היציאה עודכן בהצלחה!");
});