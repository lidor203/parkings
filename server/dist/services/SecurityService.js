"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HamalSinglton_1 = __importDefault(require("../dataAccess/HamalSinglton"));
class SecurityService {
    constructor() {
        this.requestPermission = (car) => {
            if (!(car !== null && typeof (car === null || car === void 0 ? void 0 : car.id) == "string" && car.id.length >= 5))
                throw new Error("Bad Format - expecting car with id of at least 5 characters");
            this.hamal.addToWaitingList(car);
        };
        this.approveRequest = (id, signerPN, days = 1) => {
            if (!this.hamal.isSignatureAuthorized(signerPN))
                throw new Error(`unauthorized signer ${signerPN}`);
            const car = this.hamal.getFromWaitingList(id);
            if (!car)
                throw new Error(`car ${id} not exist`);
            const code = this.hamal.addToPermittedCars(car, days);
            this.hamal.removeFromWaitingList(id);
            return code;
        };
        this.disapproveRequest = (id, signerPN) => {
            if (!this.hamal.isSignatureAuthorized(signerPN))
                throw new Error(`unauthorized signer ${signerPN}`);
            this.hamal.removeFromWaitingList(id);
        };
        this.isCarPermitted = (id, permissionCode) => {
            return this.hamal.isCarPermitted(id, permissionCode);
        };
        this.addSigner = (signer) => {
            if (!(typeof signer == "string" && signer.length >= 5))
                throw new Error("Bad Format - expecting id with at least 5 characters");
            this.hamal.addSigners(signer);
        };
        this.hamal = new HamalSinglton_1.default().getInstance();
    }
}
exports.default = SecurityService;
