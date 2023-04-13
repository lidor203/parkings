"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FireBaseService_1 = __importDefault(require("../services/FireBaseService"));
let obj;
FireBaseService_1.default.ref("/users").set(obj, function (error) {
    if (error) {
        // The write failed...
        console.log("Failed with error: " + error);
    }
    else {
        // The write was successful...
        console.log("success");
    }
});
