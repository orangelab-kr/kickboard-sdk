"use strict";
/** 킥보드 설정 정보 요청시 가져오는 인터페이스입니다.. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBatteryPacket = exports.PacketBattery = void 0;
const class_validator_1 = require("class-validator");
class PacketBattery {
    type;
    batterySN;
    totalTrip;
    totalTime;
    totalCapacity;
    cellType;
    cells;
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", String)
], PacketBattery.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketBattery.prototype, "batterySN", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketBattery.prototype, "totalTrip", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketBattery.prototype, "totalTime", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketBattery.prototype, "totalCapacity", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketBattery.prototype, "cellType", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PacketBattery.prototype, "cells", void 0);
exports.PacketBattery = PacketBattery;
function convertBatteryPacket(original) {
    return {
        type: 'battery',
        batterySN: original.batsn,
        totalTrip: original.totrip,
        totalTime: original.totime,
        totalCapacity: original.tocap,
        cellType: original.ctype,
        cells: original.cell,
    };
}
exports.convertBatteryPacket = convertBatteryPacket;
