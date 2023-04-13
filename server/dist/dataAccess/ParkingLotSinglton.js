"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingLot_1 = require("./ParkingLot");
class ParkingLotSinglton {
    constructor() {
        if (!ParkingLotSinglton.instance) {
            ParkingLotSinglton.instance = new ParkingLot_1.ParkingLot();
        }
    }
    getInstance() {
        return ParkingLotSinglton.instance;
    }
}
exports.default = ParkingLotSinglton;
