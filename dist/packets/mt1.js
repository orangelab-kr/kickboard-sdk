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
exports.PacketMT1 = exports.PacketMT1Version = void 0;
const class_validator_1 = require("class-validator");
class PacketMT1Version {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(65535),
    __metadata("design:type", Number)
], PacketMT1Version.prototype, "hardware", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(65535),
    __metadata("design:type", Number)
], PacketMT1Version.prototype, "software", void 0);
exports.PacketMT1Version = PacketMT1Version;
class PacketMT1 {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT1.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT1.prototype, "iccId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(65535),
    __metadata("design:type", Number)
], PacketMT1.prototype, "productId", void 0);
__decorate([
    class_validator_1.IsMACAddress(),
    __metadata("design:type", String)
], PacketMT1.prototype, "macAddress", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT1Version)
], PacketMT1.prototype, "iotVersion", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT1Version)
], PacketMT1.prototype, "ecuVersion", void 0);
exports.PacketMT1 = PacketMT1;
function default_1(original) {
    return {
        type: 1,
        iccId: original.id,
        productId: original.product,
        macAddress: original.mac,
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
exports.default = default_1;
