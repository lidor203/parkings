import axios from 'axios';
import { addMessegesToBlocker } from '../alarm';
import { deleteMessegesFromBlocker } from '../alarm';
import { changeAlarmMessegesTime } from '../alarm';
import { changePhoneToAlertAlarm } from '../alarm';
import { changeTimeToAlertAlarm } from '../alarm';
import { calculateTimeToSendMessege } from '../alarm';

export const addToAlarm = async (blockerCarNumber: any, blockedCarNumber: any) => { 
    try {   
        const blockerUser: any = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockerCarNumber}\"`);
        const blockedUser: any = await axios.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockedCarNumber}\"`);
        
        const blockerkey = Object.keys(blockerUser.data)[0];
        const blockedkey = Object.keys(blockedUser.data)[0];

        const timeToSendMessege = await calculateTimeToSendMessege(blockedUser.data[blockedkey]["leaveTime"], parseInt(blockerUser.data[blockerkey]["timeToAlert"]));
        
        const phone = blockerUser.data[blockerkey]["phone"];
        const messege = blockedUser.data[blockedkey]["name"] + ' (טלפון: ' + blockedUser.data[blockedkey]["phone"] + ') רוצה לצאת מהבסיס בשעה ' + blockedUser.data[blockedkey]["leaveTime"];
        const timeToAlert = blockerUser.data[blockerkey]["timeToAlert"];
      
        addMessegesToBlocker(timeToSendMessege, phone, messege, timeToAlert);

        return (messege);
    }
    catch {
        return("משהו השתבש בתזמון ההתראה!");
    }
    
    
}

export const removeFromAlarm = async (blockerPhone: any) => {
    deleteMessegesFromBlocker(blockerPhone);
}

export const changeMessegesTime = async (blockedUserPhone: any, newLeaveTime: any) =>  {
    changeAlarmMessegesTime(blockedUserPhone, newLeaveTime);
}

export const changePhoneToAlert = async (oldBlockerUserPhone: any, newBlockerUserPhone: any) =>  {
    changePhoneToAlertAlarm(oldBlockerUserPhone, newBlockerUserPhone);
}

export const changeTimeToAlert = async (phone: any, oldBlockerUserTimeToAlert: any, newBlockerUserTimeToAlert: any) =>  {
    changeTimeToAlertAlarm(phone, oldBlockerUserTimeToAlert, newBlockerUserTimeToAlert);
}