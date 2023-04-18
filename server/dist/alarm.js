"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwMesseges = exports.changeAlarmMessegesTime = exports.deleteMessegesFromBlocker = exports.addMessegesToBlocker = exports.calculateTimeToSendMessege = void 0;
const wbm = require('wbm');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let timeAlarm = new Map();
const calculateNewMessege = (messege, newLeaveTime) => __awaiter(void 0, void 0, void 0, function* () {
    let words = messege.split(' ');
    words[words.length - 1] = newLeaveTime;
    return (words.join(' '));
});
const calculateTimeToSendMessege = (leaveTime, blockerUsertimeToAlertMinutesTime) => __awaiter(void 0, void 0, void 0, function* () {
    let timeToSendMessege = new Date();
    const blockedUserLeaveTime = leaveTime.split(":");
    const blockedUserLeaveHoursTime = parseInt(blockedUserLeaveTime[0]);
    const blockedUserLeaveMinutesTime = parseInt(blockedUserLeaveTime[1]);
    let alarmHoursTime = null;
    let alarmMinutesTime = null;
    if (blockedUserLeaveMinutesTime >= blockerUsertimeToAlertMinutesTime) {
        alarmHoursTime = blockedUserLeaveHoursTime;
        alarmMinutesTime = blockedUserLeaveMinutesTime - blockerUsertimeToAlertMinutesTime;
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
    return (timeToSendMessege);
});
exports.calculateTimeToSendMessege = calculateTimeToSendMessege;
const addMessegesToBlocker = (timeToSendMessege, phone, messege, timeToAlert) => __awaiter(void 0, void 0, void 0, function* () {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }
    timeAlarm.get(timeToSendMessege).push({ "phone": phone, "messege": messege, "timeToAlert": timeToAlert });
    // console.log(timeAlarm.get(timeToSendMessege));
    // console.log(timeToSendMessege)
});
exports.addMessegesToBlocker = addMessegesToBlocker;
const deleteMessegesFromBlocker = (phone) => {
    let newMessegeList = [];
    timeAlarm.forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
        timeAlarm.get(key).forEach((child) => {
            if (child["phone"] !== phone) {
                newMessegeList.push(child);
            }
        });
        timeAlarm.delete(key);
        timeAlarm.set(key, []);
        timeAlarm.get(key).push(newMessegeList);
        newMessegeList = [];
    }));
};
exports.deleteMessegesFromBlocker = deleteMessegesFromBlocker;
const changeAlarmMessegesTime = (blockedUserPhone, newLeaveTime) => __awaiter(void 0, void 0, void 0, function* () {
    let newMessegeList = [];
    let oldMessegeList = [];
    timeAlarm.forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
        timeAlarm.get(key).forEach((child) => {
            if (child["messege"].includes(blockedUserPhone)) {
                newMessegeList.push(child);
            }
            else {
                oldMessegeList.push(child);
            }
        });
        timeAlarm.delete(key);
        if (oldMessegeList.length !== 0) {
            timeAlarm.set(key, []);
            timeAlarm.get(key).push(oldMessegeList);
        }
        oldMessegeList = [];
        for (let i = 0; i < newMessegeList.length; i++) {
            (0, exports.addMessegesToBlocker)(yield (0, exports.calculateTimeToSendMessege)(newLeaveTime, newMessegeList[i]["timeToAlert"]), newMessegeList[i]["phone"], yield calculateNewMessege(newMessegeList[i]["messege"], newLeaveTime), newMessegeList[i]["timeToAlert"]);
        }
        newMessegeList = [];
    }));
});
exports.changeAlarmMessegesTime = changeAlarmMessegesTime;
const throwMesseges = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentTime = "";
    let previousTime = "";
    let currentTimeMesseges = [];
    let phoneNumber = [];
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
                yield wbm.start({ showBrowser: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
                    yield wbm.send(phoneNumber, currentTimeMesseges[i]["messege"]);
                    yield sleep(5000);
                    yield wbm.end();
                }))
                    .catch()
                    .finally();
            }
            timeAlarm.delete(previousTime);
            timeAlarm.delete(currentTime);
        }
        yield sleep(10000);
    }
});
exports.throwMesseges = throwMesseges;
