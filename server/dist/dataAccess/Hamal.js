"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hamal {
    constructor() {
        this.addSigners = (signer) => {
            this.signatories.push(signer);
        };
        this.isSignatureAuthorized = (signer) => {
            return this.signatories.includes(signer);
        };
        this.addToWaitingList = (car) => {
            this.waitingList.push(car);
        };
        this.getFromWaitingList = (carId) => {
            return this.waitingList.find(waitingCar => waitingCar.id == carId);
        };
        this.removeFromWaitingList = (carId) => {
            this.waitingList = this.waitingList.filter(waitingCar => waitingCar.id !== carId);
        };
        this.addToPermittedCars = (car, days) => {
            const until = this.getFutureDate(days);
            const permissionCode = this.getRandomCode();
            this.permittedCars.push({ car, until, permissionCode });
            return permissionCode;
        };
        this.removeFromPermittedCars = (carId) => {
            this.permittedCars = this.permittedCars.filter(permittedCar => permittedCar.car.id !== carId);
        };
        this.isCarPermitted = (carId, permissionCode) => {
            return this.permittedCars.some(permittedCar => {
                return permittedCar.car.id == carId &&
                    permittedCar.permissionCode == permissionCode &&
                    permittedCar.until >= new Date();
            });
        };
        this.getFutureDate = (days) => {
            const now = new Date().getDate();
            const until = new Date(new Date().setDate(now + 1 * days));
            return until;
        };
        this.getRandomCode = () => {
            return Math.floor(Math.random() * 999999) + ''; //six digit number
        };
        this.signatories = [];
        this.permittedCars = [];
        this.waitingList = [];
    }
}
exports.default = Hamal;
