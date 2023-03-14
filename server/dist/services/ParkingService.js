"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingLotSinglton_1 = __importDefault(require("../dataAccess/ParkingLotSinglton"));
class ParkingService {
    constructor() {
        this.park = (id, type, contactName, contactPhone, contactPN, blocks) => {
            const car = { id, type, contactName, contactPhone, contactPN };
            this.parkingLot.addCar(car, blocks);
        };
        this.removeCar = (carId) => {
            this.parkingLot.removeCar(carId);
        };
        this.getAllBlocks = () => {
            return this.parkingLot.getBlockList();
        };
        this.getAllCars = () => {
            return this.parkingLot.getCars();
        };
        this.whoBlocks = (carId) => {
            console.log(carId);
            if (!this.parkingLot.getCarBlock(carId))
                throw new Error(`car ${carId} not exist`);
            const carBlock = this.parkingLot.getCarBlock(carId);
            if (carBlock.blockMe) {
                return [...this.whoBlocks(carBlock.blockMe), carBlock.blockMe];
            }
            else
                return [];
        };
        this.parkingLot = new ParkingLotSinglton_1.default().getInstance();
    }
}
exports.default = ParkingService;
