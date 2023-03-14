"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingRouter = void 0;
const express_1 = __importDefault(require("express"));
const ParkingService_1 = __importDefault(require("../services/ParkingService"));
exports.parkingRouter = express_1.default.Router();
const parkingService = new ParkingService_1.default();
exports.parkingRouter.post('/addCar', (req, res) => {
    const { id, type, contactName, contactPhone, contactPN, blocksIds } = req.body;
    parkingService.park(id, type, contactName, contactPhone, contactPN, blocksIds);
    res.send('car added');
});
exports.parkingRouter.post('/removeCar', (req, res) => {
    const { id } = req.body;
    parkingService.removeCar(id);
    res.send('removed');
});
exports.parkingRouter.get('/whoBlocks', (req, res) => {
    const id = req.body.id + '';
    res.send(parkingService.whoBlocks(id));
});
exports.parkingRouter.get('/allBlocks', (req, res) => {
    res.send(parkingService.getAllBlocks());
});
exports.parkingRouter.get('/allCars', (req, res) => {
    res.send(parkingService.getAllCars());
});
