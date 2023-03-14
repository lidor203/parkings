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
exports.bamRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.bamRouter = express_1.default.Router();
exports.bamRouter.use(express_1.default.json());
exports.bamRouter.post('/getBam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bam = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam.json`);
    res.status(200);
    res.json(bam.data);
}));
exports.bamRouter.post('/deleteBam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam/${req.body.key}.json`);
    res.status(200);
    res.json("סיווג המשתמש נמחק בהצלחה!");
}));
exports.bamRouter.post('/newBam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post("https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam.json", {
        "ID": req.body.userIDForBam,
        "bamStatus": req.body.userStatusForBam,
        "name": req.body.userNameForBam,
        "validDate": req.body.userValidDateForBam
    });
    res.status(200);
    res.json("סיווג המשתמש נוצר בהצלחה!");
}));
exports.bamRouter.post('/editBam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam/${req.body.key}.json`, {
        "bamStatus": req.body.userStatusForBam,
        "validDate": req.body.userValidDateForBam
    });
    res.status(200);
    res.json("סיווג המשתמש עודכן בהצלחה!");
}));
exports.bamRouter.post('/getUserBamByID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/bam.json?orderBy=\"ID\"&equalTo=\"${req.body.ID}\"`);
    res.status(200);
    res.json(user.data);
}));
