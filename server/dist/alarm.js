"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessegesFromBlocker = exports.addMessegesToBlocker = void 0;
const wbm = require('wbm');
let phoneAlarm = new Map();
let timeAlarm = new Map();
const addMessegesToBlocker = (timeToSendMessege, phone, messege) => {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }
    timeAlarm.get(timeToSendMessege).push({ "phone": phone, "messege": messege });
    timeAlarm.get(timeToSendMessege).push({ "phone": phone, "messege": messege });
    if (phoneAlarm.get(phone) === undefined) {
        phoneAlarm.set(phone, []);
    }
    phoneAlarm.get(phone).push({ "timeToSendMessege": timeToSendMessege, "messege": messege });
};
exports.addMessegesToBlocker = addMessegesToBlocker;
const deleteMessegesFromBlocker = (phone) => {
    if (phoneAlarm.get(phone) !== undefined) {
        phoneAlarm.get(phone).forEach((child) => deleteTimedMessegesFromBlocker(child["timeToSendMessege"], phone));
        phoneAlarm.delete(phone);
    }
};
exports.deleteMessegesFromBlocker = deleteMessegesFromBlocker;
const deleteTimedMessegesFromBlocker = (timeToSendMessege, phone) => {
    if (timeAlarm.get(timeToSendMessege) !== undefined) {
        let newMessegeList = [];
        timeAlarm.get(timeToSendMessege).forEach((child) => {
            if (child["phone"] !== phone) {
                newMessegeList.push(child);
            }
        });
        timeAlarm.delete(timeToSendMessege);
        if (newMessegeList.length !== 0) {
            timeAlarm.set(timeToSendMessege, newMessegeList);
        }
        console.log(timeAlarm);
    }
};
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
