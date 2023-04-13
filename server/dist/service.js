"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingLot_1 = require("./ParkingLot");
class Service {
    constructor() {
        this.register = (id, type, contactName, contactPhone) => {
            this.parkingLot.addCar(id, type, contactName, contactPhone);
        };
        this.addBlock = (carId, blocks) => {
            this.parkingLot.addBlock(carId, blocks);
        };
        this.removeCar = (carId) => {
            this.parkingLot.removeCar(carId);
        };
        this.getAllBlocks = () => {
            return this.parkingLot.getAllBlocks();
        };
        this.getAllCars = () => {
            return this.parkingLot.getAllCars();
        };
        this.whoBlocks = (carId) => {
            const carBlock = this.parkingLot.getCarBlock(carId);
            if (carBlock.blockMe) {
                return [...this.whoBlocks(carBlock.blockMe), carBlock.blockMe];
            }
            else
                return [];
        };
        this.parkingLot = new ParkingLot_1.ParkingLot();
    }
}
exports.default = Service;
