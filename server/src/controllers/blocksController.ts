import express, { Request, Response } from 'express';
import axios from 'axios';
import { updateAlarm } from '../controllers/alarmController';

export const blocksRouter = express.Router();
blocksRouter.use(express.json());

blocksRouter.post('/getBlocks', async (req: Request, res: Response) => {
    const blocks = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json`);
    res.status(200);
    res.json(blocks.data);
});

blocksRouter.post('/newBlock', async (req: Request, res: Response) => {
    const blockerCarNumber = req.body.blockerCarNumber;
    const blockedCarNumber = req.body.blockedCarNumber;
    let messege: any = "";

    await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json",
        {
            "blockerCarNumber": blockerCarNumber,
            "blockedCarNumber": blockedCarNumber
        }).then(async () => { messege = await updateAlarm(blockerCarNumber, blockedCarNumber); })
        .catch()
        .finally();
    res.status(200);   
    res.json(messege);
});

// blocksRouter.post('/deleteBlock', async (req: Request, res: Response)  => {
//     await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks/${req.body.key}.json`);
//     res.status(200);
//     res.json("החסימה נמחקה בהצלחה!");
// });

// blocksRouter.post('/editBlock', async (req: Request, res: Response)  => {
//     await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks/${req.body.key}.json`,
//     {
//         "ID" : req.body.userIDToUpdate, 
//         "name" : req.body.userNameToUpdate, 
//         "phone" : req.body.userPhoneToUpdate, 
//         "role" : req.body.userRoleToUpdate
//     });
//     res.status(200);
//     res.json("החסימה עודכנה בהצלחה!");
// });