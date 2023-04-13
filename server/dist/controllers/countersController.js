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
exports.countersRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.countersRouter = express_1.default.Router();
exports.countersRouter.use(express_1.default.json());
exports.countersRouter.post('/getCounter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const counter = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/counters.json?orderBy=\"${req.body.counterName}\"`);
    res.status(200);
    res.json(counter.data);
}));
exports.countersRouter.post('/editCounter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const counterToEdit = req.body.counterName;
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/counters.json`, {
        counterToEdit: req.body.counter
    });
    res.status(200);
    res.json("בקשת הכניסה עודכנה בהצלחה!");
}));
