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
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const alarmController_1 = require("./alarmController");
const alarmController_2 = require("./alarmController");
const alarmController_3 = require("./alarmController");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.use(express_1.default.json());
exports.usersRouter.post('/getUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    res.status(200);
    res.json(users.data);
}));
exports.usersRouter.post('/deleteUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`);
    res.status(200);
    res.json("המשתמש נמחק בהצלחה!");
}));
exports.usersRouter.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json`, {
        "ID": req.body.userIDToCreate,
        "name": req.body.userNameToCreate,
        "phone": req.body.userPhoneToCreate,
        "timeToAlert": req.body.userTimeToAlertToCreate,
        "role": req.body.userRoleToCreate,
        "carNumber": req.body.userCarNumberToCreate,
        "leaveTime": req.body.userLeaveTimeToCreate
    });
    res.status(200);
    res.json("המשתמש נוצר בהצלחה!");
}));
exports.usersRouter.post('/editUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`, {
        "ID": req.body.userIDToUpdate,
        "name": req.body.userNameToUpdate,
        "phone": req.body.userPhoneToUpdate,
        "leaveTime": req.body.userLeaveTimeToUpdate,
        "timeToAlert": req.body.userTimeToAlertToUpdate,
        "role": req.body.userRoleToUpdate,
        "carNumber": req.body.userCarNumberToUpdate
    }).then(() => {
        if (req.body.currentLeaveTime !== req.body.userLeaveTimeToUpdate) {
            (0, alarmController_1.changeMessegesTime)(req.body.phone, req.body.userLeaveTimeToUpdate);
        }
        if (req.body.currentPhone !== req.body.userPhoneToUpdate) {
            (0, alarmController_2.changePhoneToAlert)(req.body.currentPhone, req.body.userPhoneToUpdate);
        }
        if (req.body.currentTimeToAlert !== req.body.userTimeToAlertToUpdate) {
            (0, alarmController_3.changeTimeToAlert)(req.body.phone, req.body.currentTimeToAlert, req.body.userTimeToAlertToUpdate);
        }
    })
        .catch()
        .finally();
    res.status(200);
    res.json("הפרטים עודכנו בהצלחה!");
}));
exports.usersRouter.post('/getUserByCar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"carNumber\"&equalTo=\"${req.body.carNumber}\"`);
    res.status(200);
    res.json(user.data);
}));
exports.usersRouter.post('/getUserByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(user.data);
}));
exports.usersRouter.post('/changeLeaveTime', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`, {
        "leaveTime": req.body.userLeaveTime
    }).then(() => {
        (0, alarmController_1.changeMessegesTime)(req.body.blockedUserPhone, req.body.userLeaveTime);
    })
        .catch()
        .finally();
    res.status(200);
    res.json("שעת היציאה מהבסיס עודכנה בהצלחה!");
}));
