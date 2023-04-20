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
exports.changeMessegesTime = exports.removeFromAlarm = exports.addToAlarm = void 0;
const axios_1 = __importDefault(require("axios"));
const alarm_1 = require("../alarm");
const alarm_2 = require("../alarm");
const alarm_3 = require("../alarm");
const alarm_4 = require("../alarm");
const addToAlarm = (blockerCarNumber, blockedCarNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blockerUser = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockerCarNumber}\"`);
        const blockedUser = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${blockedCarNumber}\"`);
        const blockerkey = Object.keys(blockerUser.data)[0];
        const blockedkey = Object.keys(blockedUser.data)[0];
        const timeToSendMessege = yield (0, alarm_4.calculateTimeToSendMessege)(blockedUser.data[blockedkey]["leaveTime"], parseInt(blockerUser.data[blockerkey]["timeToAlert"]));
        const phone = blockerUser.data[blockerkey]["phone"];
        const messege = blockedUser.data[blockedkey]["name"] + ' (טלפון: ' + blockedUser.data[blockedkey]["phone"] + ') רוצה לצאת מהבסיס בשעה ' + blockedUser.data[blockedkey]["leaveTime"];
        const timeToAlert = blockerUser.data[blockerkey]["timeToAlert"];
        (0, alarm_1.addMessegesToBlocker)(timeToSendMessege, phone, messege, timeToAlert);
        return (messege);
    }
    catch (_a) {
        return ("משהו השתבש בתזמון ההתראה!");
    }
});
exports.addToAlarm = addToAlarm;
const removeFromAlarm = (blockerPhone) => __awaiter(void 0, void 0, void 0, function* () {
    (0, alarm_2.deleteMessegesFromBlocker)(blockerPhone);
});
exports.removeFromAlarm = removeFromAlarm;
const changeMessegesTime = (blockedUserPhone, newLeaveTime) => __awaiter(void 0, void 0, void 0, function* () {
    (0, alarm_3.changeAlarmMessegesTime)(blockedUserPhone, newLeaveTime);
});
exports.changeMessegesTime = changeMessegesTime;
