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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAlarm = void 0;
const axios_1 = __importDefault(require("axios"));
const { setAlarm, clearAlarm, Alarm } = require('set-alarm');
const wbm = require('wbm');
let alarm = null;
const updateAlarm = (blockerCarNumber, blockedCarNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const blockerUser = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockerCarNumber}\"`);
    const blockedUser = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockedCarNumber}\"`);
    const blockerkey = Object.keys(blockerUser.data)[0];
    const blockedkey = Object.keys(blockedUser.data)[0];
    let timeToSendMessege = new Date();
    const blockedUserLeaveTime = String(blockedUser.data[blockedkey]["leaveTime"]).split(":");
    const blockedUserLeaveHoursTime = parseInt(blockedUserLeaveTime[0]);
    const blockedUserLeaveMinutesTime = parseInt(blockedUserLeaveTime[1]);
    const blockerUsertimeToAlertMinutesTime = parseInt(blockerUser.data[blockerkey]["timeToAlert"]);
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
    timeToSendMessege.setUTCHours(alarmHoursTime, alarmMinutesTime, 0, 0);
    // For Debugg ONLY. Change timeToSendMessege to whenever we need to
    //timeToSendMessege = new Date()
    //timeToSendMessege.setUTCHours(timeToSendMessege.getHours(), timeToSendMessege.getMinutes(), 0, 0);
    //
    console.log(timeToSendMessege);
    const phones = [blockerUser.data[blockerkey]["phone"]];
    const messege = (yield blockedUser.data[blockedkey]["name"]) + ' (טלפון: ' + blockedUser.data[blockedkey]["phone"] + ') רוצה לצאת מהבסיס בשעה ' + blockedUser.data[blockedkey]["leaveTime"];
    //Set an alarm to activate the SMS function    
    alarm = yield setAlarm(() => __awaiter(void 0, void 0, void 0, function* () {
        // This function occur when timeToSendMessege arrives
        // {showBrowser:true}
        yield wbm.start().then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield wbm.send(phones, messege);
            setTimeout((() => { wbm.end(); }), 10000);
        }))
            .catch(console.log("error"))
            .finally();
    }), parseInt(timeToSendMessege));
    return (messege);
});
exports.updateAlarm = updateAlarm;
