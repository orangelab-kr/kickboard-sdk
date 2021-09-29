"use strict";
/** 킥보드 연결시 사용되는 인터페이스입니다. */
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
exports.convertInfoPacket = exports.PacketInfo = exports.PacketInfoVersion = void 0;
const class_validator_1 = require("class-validator");
class PacketInfoVersion {
    hardware;
    software;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], PacketInfoVersion.prototype, "hardware", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], PacketInfoVersion.prototype, "software", void 0);
exports.PacketInfoVersion = PacketInfoVersion;
class PacketInfo {
    type;
    iccId;
    productId;
    macAddress;
    iotVersion;
    ecuVersion;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", String)
], PacketInfo.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PacketInfo.prototype, "iccId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], PacketInfo.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsMACAddress)(),
    __metadata("design:type", String)
], PacketInfo.prototype, "macAddress", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", PacketInfoVersion)
], PacketInfo.prototype, "iotVersion", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", PacketInfoVersion)
], PacketInfo.prototype, "ecuVersion", void 0);
exports.PacketInfo = PacketInfo;
function convertInfoPacket(original) {
    return {
        type: 'info',
        iccId: original.id || original.ic || 'Unknown ICC',
        productId: original.product,
        macAddress: original.ble_mac,
        iotVersion: {
            software: original.iot_sw,
            hardware: original.iot_hw,
        },
        ecuVersion: {
            software: original.ecu_sw,
            hardware: original.ecu_hw,
        },
    };
}
exports.convertInfoPacket = convertInfoPacket;
