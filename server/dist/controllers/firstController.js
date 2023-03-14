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
exports.firstRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.firstRouter = express_1.default.Router();
exports.firstRouter.use(express_1.default.json());
exports.firstRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    if (JSON.stringify(user.data) === "{}") {
        res.status(404);
        res.json("שם המשתמש או הסיסמא אינם נכונים!");
    }
    else {
        const userPassword = req.body.password;
        let password;
        for (const key in user.data) {
            password = user.data[key].password;
        }
        if (userPassword !== password) {
            res.status(401);
            res.json("שם המשתמש או הסיסמא אינם נכונים!");
        }
        else {
            res.status(200);
            res.json(user.data);
        }
    }
}));
exports.firstRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.ID;
    const user = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy=\"ID\"&equalTo=\"${userID}\"`);
    if (JSON.stringify(user.data) !== "{}") {
        res.status(403);
        res.json("שם המשתמש כבר בשימוש");
    }
    else {
        yield axios_1.default.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
            "ID": req.body.ID,
            "name": req.body.fullName,
            "password": req.body.password,
            "phone": req.body.phone,
            "carNumber": req.body.carNumber,
            "leaveTime": req.body.leaveTime,
            "role": "אורח"
        });
        res.status(200);
        res.json("המשתמש נוצר בהצלחה!");
    }
}));
