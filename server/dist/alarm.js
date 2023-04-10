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
exports.throwMesseges = exports.deleteMessegesFromBlocker = exports.addMessegesToBlocker = void 0;
const wbm = require('wbm');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let phoneAlarm = new Map();
let timeAlarm = new Map();
const addMessegesToBlocker = (timeToSendMessege, phone, messege) => {
    if (timeAlarm.get(timeToSendMessege) === undefined) {
        timeAlarm.set(timeToSendMessege, []);
    }
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
    }
};
const throwMesseges = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentTime = "";
    let currentTimeMesseges = [];
    let phoneNumber = [];
    while (true) {
        currentTime = new Date();
        currentTime = currentTime.setUTCHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
        currentTimeMesseges = timeAlarm.get(currentTime);
        if (currentTimeMesseges !== undefined) {
            for (let i = 0; i < currentTimeMesseges.length; i++) {
                phoneNumber = [];
                phoneNumber.push(currentTimeMesseges[i]["phone"]);
                //{showBrowser:true}
                yield wbm.start().then(() => __awaiter(void 0, void 0, void 0, function* () {
                    yield wbm.send(phoneNumber, currentTimeMesseges[i]["messege"]);
                    yield sleep(5000);
                    yield wbm.end();
                }))
                    .catch()
                    .finally();
            }
            timeAlarm.delete(currentTime);
        }
        yield sleep(10000);
    }
});
exports.throwMesseges = throwMesseges;
