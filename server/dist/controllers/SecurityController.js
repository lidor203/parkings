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
exports.securityRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.securityRouter = express_1.default.Router();
exports.securityRouter.use(express_1.default.json());
exports.securityRouter.post('/getSecurity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const security = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json`);
    res.status(200);
    res.json(security.data);
}));
exports.securityRouter.post('/deleteSecurity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers/${req.body.key}.json`);
    res.status(200);
    res.json("חסימת האבטחה נמחקה בהצלחה!");
}));
exports.securityRouter.post('/newSecurity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nowTime = new Date();
    const month = (nowTime.getMonth() + 1) < 10 ? "0" + (nowTime.getMonth() + 1).toString() : (nowTime.getMonth() + 1).toString();
    const date = nowTime.getDate().toString() + "-" + month + "-" + nowTime.getFullYear().toString();
    yield axios_1.default.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json", {
        "ID": req.body.IDToCreate,
        "name": req.body.nameToCreate,
        "reason": req.body.reasonToCreate,
        "date": date
    });
    res.status(200);
    res.json("חסימת האבטחה נוצרה בהצלחה!");
}));
exports.securityRouter.post('/editSecurity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nowTime = new Date();
    const month = (nowTime.getMonth() + 1) < 10 ? "0" + (nowTime.getMonth() + 1).toString() : (nowTime.getMonth() + 1).toString();
    const date = nowTime.getDate().toString() + "-" + month + "-" + nowTime.getFullYear().toString();
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers/${req.body.key}.json`, {
        "name": req.body.disclaimedNameToUpadte,
        "reason": req.body.disclaimedReasonToUpdate,
        "date": date
    });
    res.status(200);
    res.json("חסימת האבטחה עודכנה בהצלחה!");
}));
exports.securityRouter.post('/getSecurityDisclaimerByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const securityDisclaimer = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/securityDisclaimers.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(securityDisclaimer.data);
}));
