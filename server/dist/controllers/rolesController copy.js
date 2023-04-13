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
exports.rolesRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.rolesRouter = express_1.default.Router();
exports.rolesRouter.use(express_1.default.json());
exports.rolesRouter.post('/getroles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield axios_1.default.get(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles.json`);
    res.status(200);
    res.json(roles.data);
}));
exports.rolesRouter.post('/deleteRole', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles/${req.body.key}.json`);
    res.status(200);
    res.json("role deleted successfully!");
}));
exports.rolesRouter.post('/editRole', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.patch(`https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app/roles/${req.body.key}.json`, {
        "value": req.body.valueToUpdate
    });
    res.status(200);
    res.json("role updated successfully!");
}));
