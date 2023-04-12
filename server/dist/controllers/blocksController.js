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
exports.blocksRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const alarmController_1 = require("../controllers/alarmController");
const alarmController_2 = require("../controllers/alarmController");
exports.blocksRouter = express_1.default.Router();
exports.blocksRouter.use(express_1.default.json());
exports.blocksRouter.post('/getBlocks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blocks = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json`);
    res.status(200);
    res.json(blocks.data);
}));
exports.blocksRouter.post('/newBlock', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isBlcokExist = false;
    let messege = "החסימה כבר רשומה במאגר!";
    const blockerCarNumber = req.body.blockerCarNumber;
    const blockedCarNumber = req.body.blockedCarNumber;
    const blocks = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json?orderBy=\"blockerCarNumber\"&equalTo=\"${blockerCarNumber}\"`);
    for (const key in blocks.data) {
        if (blocks.data[key]["blockedCarNumber"] === blockedCarNumber) {
            isBlcokExist = true;
            res.status(201);
            break;
        }
    }
    if (!(isBlcokExist)) {
        yield axios_1.default.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json", {
            "blockerCarNumber": blockerCarNumber,
            "blockedCarNumber": blockedCarNumber
        }).then(() => __awaiter(void 0, void 0, void 0, function* () { messege = yield (0, alarmController_1.addToAlarm)(blockerCarNumber, blockedCarNumber); }))
            .catch()
            .finally();
        res.status(200);
    }
    res.json(messege);
}));
exports.blocksRouter.post('/deleteBlock', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blocks = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json?orderBy=\"blockerCarNumber\"&equalTo=\"${req.body.userCarNumber}\"`);
    for (const key in blocks.data) {
        yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks/${key}.json`);
    }
    (0, alarmController_2.removeFromAlarm)(req.body.userPhone);
    res.status(200);
    res.json("החסימות נמחקו בהצלחה!");
}));
exports.blocksRouter.post('/changeAlarmMessegesToNewTime', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //blockedUserPhone
    const blocks = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks.json?orderBy=\"blockerCarNumber\"&equalTo=\"${req.body.userCarNumber}\"`);
    for (const key in blocks.data) {
        yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/blocks/${key}.json`);
    }
    (0, alarmController_2.removeFromAlarm)(req.body.userPhone);
    res.status(200);
    res.json("החסימות נמחקו בהצלחה!");
}));
