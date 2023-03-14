"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hamal_1 = __importDefault(require("./Hamal"));
class HamalSinglton {
    constructor() {
        if (!HamalSinglton.instance) {
            HamalSinglton.instance = new Hamal_1.default();
        }
    }
    getInstance() {
        return HamalSinglton.instance;
    }
}
exports.default = HamalSinglton;
