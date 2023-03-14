import express, { Request, Response } from 'express';
import axios from 'axios';

export const bamRouter = express.Router();
bamRouter.use(express.json());

bamRouter.post('/getBam', async (req: Request, res: Response) => {
    const bam = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam.json`);
    res.status(200);
    res.json(bam.data);
});

bamRouter.post('/deleteBam', async (req: Request, res: Response)  => {
    await axios.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam/${req.body.key}.json`);
    res.status(200);
    res.json("סיווג המשתמש נמחק בהצלחה!");
});

bamRouter.post('/newBam', async (req: Request, res: Response) => { 
    await axios.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam.json",
    {
        "ID" : req.body.userIDForBam,
        "bamStatus" : req.body.userStatusForBam, 
        "name" : req.body.userNameForBam, 
        "validDate" : req.body.userValidDateForBam
    });
    res.status(200);
    res.json("סיווג המשתמש נוצר בהצלחה!");
});

bamRouter.post('/editBam', async (req: Request, res: Response)  => {
    await axios.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam/${req.body.key}.json`,
    {
        "bamStatus" : req.body.userStatusForBam,
        "validDate" : req.body.userValidDateForBam
    });
    res.status(200);
    res.json("סיווג המשתמש עודכן בהצלחה!");
});

bamRouter.post('/getUserBamByID', async (req: Request, res: Response)  => {
    const user = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(user.data);
});