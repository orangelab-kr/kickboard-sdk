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
exports.PacketMT5 = void 0;
const class_validator_1 = require("class-validator");
class PacketMT5 {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT5.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT5.prototype, "batterySN", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT5.prototype, "totalTrip", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT5.prototype, "totalTime", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT5.prototype, "totalCapacity", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT5.prototype, "cellType", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PacketMT5.prototype, "cells", void 0);
exports.PacketMT5 = PacketMT5;
function default_1(original) {
    return {
        type: 5,
        batterySN: original.batsn,
        totalTrip: original.totrip,
        totalCapacity: original.tocap,
        cellType: original.ctype,
        cells: original.cell,
    };
}
exports.default = default_1;
