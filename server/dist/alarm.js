"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addtime = void 0;
const wbm = require('wbm');
let phoneAlarm = new Map();
let timeAlarm = new Map();
const addtime = (timeToSendMessege, phone, messege) => {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }
    timeAlarm.get(timeToSendMessege).push({ "phone": phone, "messege": messege });
    if (phoneAlarm.get(phone) === undefined) {
        phoneAlarm.set(phone, []);
    }
    phoneAlarm.get(phone).push({ "timeToSendMessege": timeToSendMessege, "messege": messege });
};
exports.addtime = addtime;
// export const deleteblocks = (phone:string) => {
//     if (phoneAlarm.get(phone) !== undefined) {
//         for (const key in phoneAlarm.get(phone)) { 
//             timeAlarm.get(key["timeToSendMessege"])
//         }
//         phoneAlarm.delete(phone);
//     }    
// }
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
