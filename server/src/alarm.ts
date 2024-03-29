import { time, timeEnd } from "console";
import { parse } from "path";

const wbm = require('wbm');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let timeAlarm = new Map();

const calculateNewMessege = async (messege:string, newLeaveTime:string) => {
    let words: any[] = messege.split(' ');
    words[words.length -1] = newLeaveTime;
    return(words.join(' '));
}

export const calculateTimeToSendMessege = async (leaveTime:string, blockerUsertimeToAlertMinutesTime:number) => {
    let timeToSendMessege: any = new Date();
    const blockedUserLeaveTime = leaveTime.split(":");
    const blockedUserLeaveHoursTime = parseInt(blockedUserLeaveTime[0]);
    const blockedUserLeaveMinutesTime = parseInt(blockedUserLeaveTime[1]);

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

    timeToSendMessege = new Date();
    timeToSendMessege = timeToSendMessege.setUTCHours(alarmHoursTime, alarmMinutesTime, 0, 0);
    
    // For Debugg ONLY. Change timeToSendMessege to whenever we need to
    // timeToSendMessege = new Date();
    // timeToSendMessege = timeToSendMessege.setUTCHours(timeToSendMessege.getHours(), timeToSendMessege.getMinutes()+1, 0, 0);
    // console.log(timeToSendMessege);
    
    return(timeToSendMessege);
}

export const addMessegesToBlocker = async (timeToSendMessege:string, phone:string, messege:string, timeToAlert:string) => {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }

    timeAlarm.get(timeToSendMessege).push({"phone":phone, "messege":messege, "timeToAlert":timeToAlert});
    // console.log(timeAlarm.get(timeToSendMessege));
    // console.log(timeToSendMessege)
}

export const deleteMessegesFromBlocker = (phone:string) => {
    let newMessegeList: any[] = [];

    timeAlarm.forEach(async (value, key) => {
        value.forEach((child:any) => {
            if (child["phone"] !== phone) {
                newMessegeList.push(child);
            }
        })

        if (newMessegeList.length === 0) {
            timeAlarm.delete(key);
        }
        else {
            timeAlarm.set(key, newMessegeList);
        }

        newMessegeList = [];
    })  
}

export const changeAlarmMessegesTime = async (blockedUserPhone: string, newLeaveTime: string) => {
    let newMessegeList: any[] = [];
    let oldMessegeList: any[] = [];

    timeAlarm.forEach(async (value, key) => {
        value.forEach((child:any) => {
            if (child["messege"].includes(blockedUserPhone)) {
                newMessegeList.push(child);
            }
            else {
                oldMessegeList.push(child);
            }
        })

        timeAlarm.delete(key);

        if (oldMessegeList.length !== 0) {
            timeAlarm.set(key, []);
            timeAlarm.get(key).push(oldMessegeList);
        }

        oldMessegeList = [];

        for (let i = 0; i < newMessegeList.length; i++) {
            addMessegesToBlocker(await calculateTimeToSendMessege(newLeaveTime, newMessegeList[i]["timeToAlert"]), newMessegeList[i]["phone"], await calculateNewMessege(newMessegeList[i]["messege"], newLeaveTime), newMessegeList[i]["timeToAlert"]);            
        }

        newMessegeList = [];
    })      
}

export const changePhoneToAlertAlarm = async (oldBlockerUserPhone: string, newBlockerUserPhone: string) => {
    timeAlarm.forEach(async (value) => {
        value.forEach((child:any) => {
            if (child["phone"] === oldBlockerUserPhone) {
                child["phone"] = newBlockerUserPhone;
            }
        })

    })      
}

export const changeTimeToAlertAlarm = async (phone: string, oldBlockerUserTimeToAlert: string, newBlockerUserTimeToAlert: string) => {
    const timeToAlertChange = parseInt(newBlockerUserTimeToAlert) - parseInt(oldBlockerUserTimeToAlert);
    timeAlarm.forEach(async (value, key) => {
        value.forEach(function(child:any, index:any, object:any) {
            if (child["phone"] === phone) {
                const newKey = timeAlarm.get(parseInt(key) + (timeToAlertChange * 60000));

                //meaning - I want to get an alert later than i wanted before
                if (timeToAlertChange > 0){                   
                    if (timeAlarm.get(newKey) === undefined) {
                        timeAlarm.set(newKey, []);
                    }

                    timeAlarm.get(newKey).push({"phone":child["phone"], "messege":child["messege"], "timeToAlert":child["timeToAlert"]});
                }
                //meaning - I want to get an alert earlier than i wanted before
                //needs to check if the time has already passed (and than just make it to alert now)
                else {
                    let nowInUTCTime = Date.now();

                    //the time to alert has already passed
                    if (nowInUTCTime < newKey){
                        const firstKeyElement = timeAlarm.entries().next().value[0];
                        timeAlarm.get(firstKeyElement).push({"phone":child["phone"], "messege":child["messege"], "timeToAlert":child["timeToAlert"]});
                    }
                    else{
                        timeAlarm.get(newKey).push({"phone":child["phone"], "messege":child["messege"], "timeToAlert":child["timeToAlert"]});
                    }
                } 
                
                object.splice(index, 1);
            }
        })
    })  
}

export const throwMesseges = async () => {
    let currentTime: any = "";
    let previousTime: any = "";
    let currentTimeMesseges: any[] = [];
    let phoneNumber :any[] = [];

    while (true) {        
        currentTime = new Date(); // we have to make it a Date Befor change it to UTC so we can use it's getHours and getMinutes functions
        currentTime = currentTime.setUTCHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
        previousTime = currentTime - 60000; //We also calculate it for the chance of missing a minute between the Alarm register and the Alarm notification      

        //console.log(currentTime);
        //console.log(previousTime);
        
        if (timeAlarm.get(previousTime) !== undefined) {
            currentTimeMesseges = timeAlarm.get(previousTime).concat(timeAlarm.get(currentTime));
            
        }
        else {
            currentTimeMesseges = timeAlarm.get(currentTime);
        } 

        if (currentTimeMesseges !== undefined) {
            for (let i = 0; i < currentTimeMesseges.length; i++) {
                phoneNumber = [];
                phoneNumber.push(currentTimeMesseges[i]["phone"]);
                await wbm.start({showBrowser:true}).then(
                    async () => {              
                                    await wbm.send(phoneNumber, currentTimeMesseges[i]["messege"]);
                                    await sleep(5000);
                                    await wbm.end();
                                })
                .catch()
                .finally();
            }

            timeAlarm.delete(previousTime);
            timeAlarm.delete(currentTime);
        }
        
        await sleep(10000);
    }
}