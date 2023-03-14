"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
class ParkingLot {
    constructor() {
        this.addCar = (id, type, contactName, contactPhone) => {
            this.cars[id] = { id, type, contactName, contactPhone };
            this.blockList[id] = { me: id, iBlock: [] };
        };
        this.addBlock = (carId, blocks) => {
            this.throwIfCarNotExist(carId);
            const blockedCars = [];
            blocks.forEach(carToBlock => {
                this.throwIfCarNotExist(carToBlock);
                const blockedCar = this.blockList[carToBlock];
                blockedCars.push(blockedCar.me);
                blockedCar.blockMe = carId;
            });
            this.blockList[carId] = { me: carId, iBlock: blockedCars };
        };
        this.removeCar = (carId) => {
            delete this.cars[carId];
            const { iBlock } = this.blockList[carId];
            iBlock.forEach(blockedCarId => {
                const blockedCar = this.blockList[blockedCarId];
                delete blockedCar.blockMe;
            });
            delete this.blockList[carId];
        };
        this.getCarBlock = (carId) => {
            return this.blockList[carId];
        };
        this.getAllBlocks = () => {
            return this.blockList;
        };
        this.getAllCars = () => {
            return this.cars;
        };
        this.throwIfCarNotExist = (carId) => {
            if (!this.cars[carId])
                throw new Error("can't find car - " + carId);
        };
        this.cars = {};
        this.blockList = {};
    }
}
exports.ParkingLot = ParkingLot;
