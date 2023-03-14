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
exports.jobsRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.jobsRouter = express_1.default.Router();
exports.jobsRouter.use(express_1.default.json());
exports.jobsRouter.post('/getjobs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json`);
    res.status(200);
    res.json(jobs.data);
}));
exports.jobsRouter.post('/deleteJob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`);
    res.status(200);
    res.json("תפקיד המשתמש נמחק בהצלחה!");
}));
exports.jobsRouter.post('/newJob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`, {
        "role": req.body.userRoleForJob
    });
    res.status(200);
    res.json("תפקיד המשתמש נוצר בהצלחה!");
}));
exports.jobsRouter.post('/editJob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users/${req.body.key}.json`, {
        "role": req.body.roleToUpdate
    });
    res.status(200);
    res.json("תפקיד המשתמש עודכן בהצלחה!");
}));
exports.jobsRouter.post('/getRolesDescriptions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rolesDescriptions = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles.json`);
    res.status(200);
    res.json(rolesDescriptions.data);
}));
