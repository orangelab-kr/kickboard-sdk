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
exports.PacketMT4 = exports.PacketMT4ReportInterval = exports.PacketMT4Mqtt = exports.PacketMT4Gprs = void 0;
const class_validator_1 = require("class-validator");
class PacketMT4Gprs {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Gprs.prototype, "apad", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Gprs.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Gprs.prototype, "password", void 0);
exports.PacketMT4Gprs = PacketMT4Gprs;
class PacketMT4Mqtt {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Mqtt.prototype, "ipAddress", void 0);
__decorate([
    class_validator_1.IsPort(),
    __metadata("design:type", Number)
], PacketMT4Mqtt.prototype, "port", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Mqtt.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Mqtt.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4Mqtt.prototype, "password", void 0);
exports.PacketMT4Mqtt = PacketMT4Mqtt;
class PacketMT4ReportInterval {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT4ReportInterval.prototype, "ping", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT4ReportInterval.prototype, "trip", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT4ReportInterval.prototype, "static", void 0);
exports.PacketMT4ReportInterval = PacketMT4ReportInterval;
class PacketMT4 {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT4.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4.prototype, "parameters", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT4Gprs)
], PacketMT4.prototype, "gprs", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT4Mqtt)
], PacketMT4.prototype, "mqtt", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT4ReportInterval)
], PacketMT4.prototype, "reportInterval", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PacketMT4.prototype, "networks", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT4.prototype, "impact", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketMT4.prototype, "bluetoothKey", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(8),
    class_validator_1.Max(50),
    __metadata("design:type", Number)
], PacketMT4.prototype, "speedLimit", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsIn(['auto', 'gsm', 'wcdma', 'lte', 'td-scdma']),
    __metadata("design:type", String)
], PacketMT4.prototype, "networkMode", void 0);
exports.PacketMT4 = PacketMT4;
function getNetworkMode(netconfig) {
    switch (netconfig) {
        case '0':
            return 'auto';
        case '1':
            return 'gsm';
        case '2':
            return 'wcdma';
        case '3':
            return 'lte';
        case '4':
            return 'td-scdma';
    }
}
function getObjectFromArray(original) {
    const packet = {};
    original.pa.forEach(({ name, value }) => (packet[name] = value));
    return packet;
}
function getNetworks(convert) {
    const networks = [];
    if (convert.network) {
        networks.push(convert.network);
    }
    if (convert.network2) {
        networks.push(convert.network2);
    }
    if (convert.network3) {
        networks.push(convert.network3);
    }
    return networks;
}
function default_1(original) {
    const convert = getObjectFromArray(original);
    return {
        type: 4,
        gprs: {
            apad: convert.apad,
            username: convert.auser,
            password: convert.apass,
        },
        mqtt: {
            ipAddress: convert.ip,
            port: Number(convert.port),
            clientId: convert.mqid,
            username: convert.mquser,
            password: convert.mqpass,
        },
        reportInterval: {
            ping: Number(convert.ping),
            trip: Number(convert.tripint),
            static: Number(convert.statint),
        },
        networks: getNetworks(convert),
        impact: Number(convert.impact),
        bluetoothKey: convert.blekey,
        speedLimit: Number(convert.speedlim),
        networkMode: getNetworkMode(convert.netconfig),
    };
}
exports.default = default_1;
