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
exports.convertConfigPacket = exports.PacketConfig = exports.PacketConfigReportInterval = exports.PacketConfigMqtt = exports.PacketConfigGprs = void 0;
const class_validator_1 = require("class-validator");
class PacketConfigGprs {
    apad;
    username;
    password;
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigGprs.prototype, "apad", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigGprs.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigGprs.prototype, "password", void 0);
exports.PacketConfigGprs = PacketConfigGprs;
class PacketConfigMqtt {
    ipAddress;
    port;
    clientId;
    username;
    password;
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigMqtt.prototype, "ipAddress", void 0);
__decorate([
    class_validator_1.IsPort(),
    __metadata("design:type", Number)
], PacketConfigMqtt.prototype, "port", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigMqtt.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigMqtt.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfigMqtt.prototype, "password", void 0);
exports.PacketConfigMqtt = PacketConfigMqtt;
class PacketConfigReportInterval {
    ping;
    trip;
    static;
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketConfigReportInterval.prototype, "ping", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketConfigReportInterval.prototype, "trip", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketConfigReportInterval.prototype, "static", void 0);
exports.PacketConfigReportInterval = PacketConfigReportInterval;
class PacketConfig {
    type;
    gprs;
    mqtt;
    reportInterval;
    networks;
    impact;
    bluetoothKey;
    speedLimit;
    networkMode;
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", String)
], PacketConfig.prototype, "type", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketConfigGprs)
], PacketConfig.prototype, "gprs", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketConfigMqtt)
], PacketConfig.prototype, "mqtt", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketConfigReportInterval)
], PacketConfig.prototype, "reportInterval", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PacketConfig.prototype, "networks", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketConfig.prototype, "impact", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PacketConfig.prototype, "bluetoothKey", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(8),
    class_validator_1.Max(50),
    __metadata("design:type", Number)
], PacketConfig.prototype, "speedLimit", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsIn(['auto', 'gsm', 'wcdma', 'lte', 'td-scdma']),
    __metadata("design:type", String)
], PacketConfig.prototype, "networkMode", void 0);
exports.PacketConfig = PacketConfig;
function getNetworkMode(netconfig) {
    if (netconfig === '0')
        return 'auto';
    else if (netconfig === '1')
        return 'gsm';
    else if (netconfig === '2')
        return 'wcdma';
    else if (netconfig === '3')
        return 'lte';
    else if (netconfig === '4')
        return 'td-scdma';
    return 'auto';
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
function convertConfigPacket(original) {
    const convert = getObjectFromArray(original);
    return {
        type: 'config',
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
exports.convertConfigPacket = convertConfigPacket;
