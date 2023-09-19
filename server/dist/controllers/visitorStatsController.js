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
exports.visitorStatsRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.visitorStatsRouter = express_1.default.Router();
exports.visitorStatsRouter.use(express_1.default.json());
exports.visitorStatsRouter.post('/getVisitorStats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const visitorStats = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/requestsHistory.json`);
    res.status(200);
    res.json(visitorStats.data);
}));
