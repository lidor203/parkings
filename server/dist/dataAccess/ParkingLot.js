"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
class ParkingLot {
    constructor() {
        this.addCar = (car, blocks = []) => {
            const { id } = car;
            this.cars[id] = car;
            this.blockList[id] = { me: id, iBlock: blocks };
            const blockedCars = [];
            blocks.forEach(carToBlock => {
                this.throwIfCarNotExist(carToBlock);
                const blockedCar = this.blockList[carToBlock];
                blockedCars.push(blockedCar.me);
                blockedCar.blockMe = id;
            });
            this.blockList[id] = { me: id, iBlock: blockedCars };
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
        this.getBlockList = () => {
            return this.blockList;
        };
        this.getCars = () => {
            return this.cars;
        };
        this.getCar = (id) => {
            return this.cars[id];
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
