import axios from 'axios';
import { time } from 'console';

const { setAlarm, clearAlarm, Alarm } = require('set-alarm');
const wbm = require('wbm');


let alarm: any = null;

 export const updateAlarm = async (blockerCarNumber: any, blockedCarNumber: any) => {    
    const blockerUser: any = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockerCarNumber}\"`);
    const blockedUser: any = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockedCarNumber}\"`);
    
    const blockerkey = Object.keys(blockerUser.data)[0];
    const blockedkey = Object.keys(blockedUser.data)[0];

    let timeToSendMessege: any = new Date();
    const blockedUserLeaveTime = String(blockedUser.data[blockedkey]["leaveTime"]).split(":");
    const blockedUserLeaveHoursTime = parseInt(blockedUserLeaveTime[0]);
    const blockedUserLeaveMinutesTime = parseInt(blockedUserLeaveTime[1]);
    const blockerUsertimeToAlertMinutesTime = parseInt(blockerUser.data[blockerkey]["timeToAlert"]);
    let alarmHoursTime = null;
    let alarmMinutesTime = null;

    if (blockedUserLeaveMinutesTime >= blockerUsertimeToAlertMinutesTime) {
        alarmHoursTime = blockedUserLeaveHoursTime;
        alarmMinutesTime = blockedUserLeaveMinutesTime - blockerUsertimeToAlertMinutesTime
    }
    else {
        alarmMinutesTime = 60 - (blockerUsertimeToAlertMinutesTime - blockedUserLeaveMinutesTime);
        alarmHoursTime = blockedUserLeaveHoursTime - 1;
    }

    // for cases when the hour gets to be -1
    // for example: if the blocked time to leave is 00:15 and the blocker time to alert is 30 minutes
    if (alarmHoursTime < 0) {
        alarmHoursTime = 0;
        alarmMinutesTime = 0;
    }

    timeToSendMessege.setUTCHours(alarmHoursTime, alarmMinutesTime, 0, 0);

    // For Debugg ONLY. Change timeToSendMessege to whenever we need to
    //timeToSendMessege = new Date()
    //timeToSendMessege.setUTCHours(timeToSendMessege.getHours(), timeToSendMessege.getMinutes(), 0, 0);
    //

    console.log(timeToSendMessege);

    const phones = [blockerUser.data[blockerkey]["phone"]];
    const messege = await blockedUser.data[blockedkey]["name"] + ' (טלפון: ' + blockedUser.data[blockedkey]["phone"] + ') רוצה לצאת מהבסיס בשעה ' + blockedUser.data[blockedkey]["leaveTime"];
    
    //Set an alarm to activate the SMS function    
    alarm = await setAlarm(async () => {    
        // This function occur when timeToSendMessege arrives
        // {showBrowser:true}
        await wbm.start().then(
            async () => {              
                                await wbm.send(phones, messege);
                                setTimeout((() => { wbm.end(); }), 10000);
                        })
        .catch(console.log("error"))
        .finally();
    }, parseInt(timeToSendMessege));

    return (messege);
}