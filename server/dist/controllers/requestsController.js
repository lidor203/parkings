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
exports.requestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.requestsRouter = express_1.default.Router();
exports.requestsRouter.use(express_1.default.json());
exports.requestsRouter.post('/getRequests', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json`);
    res.status(200);
    res.json(requests.data);
}));
exports.requestsRouter.post('/deleteRequest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests/${req.body.key}.json`);
    res.status(200);
    res.json("בקשת הכניסה נמחקה בהצלחה!");
}));
exports.requestsRouter.post('/newRequest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json", {
        "ID": req.body.ID,
        "visitorName": req.body.visitorName,
        "visitorID": req.body.visitorID,
        "visitorPhone": req.body.visitorPhone,
        "hostID": req.body.hostID,
        "hostName": req.body.hostName,
        "hostPhone": req.body.hostPhone,
        "requester": req.body.userID
    });
    res.status(200);
    res.json("בקשת הכניסה נוצרה בהצלחה!");
}));
exports.requestsRouter.post('/editRequest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests/${req.body.key}.json`, {
        "ID": req.body.ID,
        "visitorName": req.body.visitorName,
        "visitorID": req.body.visitorID,
        "visitorPhone": req.body.visitorPhone,
        "hostID": req.body.hostID,
        "hostName": req.body.hostName,
        "hostPhone": req.body.hostPhone,
        "requester": req.body.userID
    });
    res.status(200);
    res.json("בקשת הכניסה עודכנה בהצלחה!");
}));
exports.requestsRouter.post('/getRequestsByHostID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json?orderBy=\"hostID\"&equalTo=\"${req.body.hostID}\"`);
    res.status(200);
    res.json(requests.data);
}));
exports.requestsRouter.post('/getRequestByVisitorID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests.json?orderBy=\"visitorID\"&equalTo=\"${req.body.visitorID}\"`);
    res.status(200);
    res.json(request.data);
}));
exports.requestsRouter.post('/deleteRequestByVisitorID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.key);
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requests/${req.body.key}.json`);
    res.status(200);
    res.json("בקשת הכניסה נמחקה בהצלחה!");
}));
