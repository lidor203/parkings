import { log } from "console";

const wbm = require('wbm');

let phoneAlarm = new Map();
let timeAlarm = new Map();

export const addMessegesToBlocker = (timeToSendMessege:string, phone:string, messege:string) => {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }
    timeAlarm.get(timeToSendMessege).push({"phone":phone, "messege":messege});
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

// export const throwMesseges = async () => {
//     //Set an alarm to activate the SMS function    
//     alarm = await setAlarm(async () => {    
//         // This function occur when timeToSendMessege arrives
//         await wbm.start({showBrowser:true}).then(
//             async () => {              
//                                 await wbm.send(phones, messege);
//                                 setTimeout((() => { wbm.end(); }), 10000);
//                         })
//         .catch(console.log("error"))
//         .finally();
//     }, timeToSendMessege);
// }