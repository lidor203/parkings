import { log } from "console";

const wbm = require('wbm');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let phoneAlarm = new Map();
let timeAlarm = new Map();

export const addMessegesToBlocker = (timeToSendMessege:string, phone:string, messege:string) => {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }
    timeAlarm.get(timeToSendMessege).push({"phone":phone, "messege":messege});

    if (phoneAlarm.get(phone) === undefined) {
        phoneAlarm.set(phone, []);
    }
    phoneAlarm.get(phone).push({"timeToSendMessege":timeToSendMessege, "messege":messege});
}

export const deleteMessegesFromBlocker = (phone:string) => {
    if (phoneAlarm.get(phone) !== undefined) {
        phoneAlarm.get(phone).forEach((child: any) => deleteTimedMessegesFromBlocker(child["timeToSendMessege"], phone));   
        phoneAlarm.delete(phone);
    }    
}

const deleteTimedMessegesFromBlocker = (timeToSendMessege:string, phone:string) => {
    if (timeAlarm.get(timeToSendMessege) !== undefined) {
        let newMessegeList: any[] = [];
        
        timeAlarm.get(timeToSendMessege).forEach((child: any) => {
            if (child["phone"] !== phone) {
                newMessegeList.push(child);
            }
        });

        timeAlarm.delete(timeToSendMessege);

        if (newMessegeList.length !== 0) {
            timeAlarm.set(timeToSendMessege, newMessegeList);
        }
    }    
}

export const throwMesseges = async () => {
    let currentTime :any = "";
    let currentTimeMesseges: any[] = [];
    let phoneNumber :any[] = [];

    while (true) {
        currentTime = new Date();
        currentTime = currentTime.setUTCHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
        currentTimeMesseges = timeAlarm.get(currentTime);

        if (currentTimeMesseges !== undefined) {
            for (let i = 0; i < currentTimeMesseges.length; i++) {
                phoneNumber = [];
                phoneNumber.push(currentTimeMesseges[i]["phone"]);
                //{showBrowser:true}
                await wbm.start().then(
                    async () => {              
                                    await wbm.send(phoneNumber, currentTimeMesseges[i]["messege"]);
                                    await sleep(5000);
                                    await wbm.end();
                                })
                .catch()
                .finally();
            }

            timeAlarm.delete(currentTime);
        }
        
        await sleep(10000);
    }
}