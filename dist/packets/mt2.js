"use strict";
/** 킥보드 일정 간격으로 발송되는 프로토콜 인터페이스입니다. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMT2 = exports.PacketMT2Power = exports.PacketMT2PowerDetails = exports.PacketMT2Vehicle = exports.PacketMT2ReportReason = exports.PacketMT2Status = exports.PacketMT2Trip = exports.PacketMT2Network = exports.PacketMT2Gps = void 0;
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
class PacketMT2Gps {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], PacketMT2Gps.prototype, "timestamp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(-90),
    class_validator_1.Max(90),
    __metadata("design:type", Number)
], PacketMT2Gps.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(-180),
    class_validator_1.Max(180),
    __metadata("design:type", Number)
], PacketMT2Gps.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketMT2Gps.prototype, "satelliteUsedCount", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Gps.prototype, "isValid", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketMT2Gps.prototype, "speed", void 0);
exports.PacketMT2Gps = PacketMT2Gps;
class PacketMT2Network {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Network.prototype, "isRoaming", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(99),
    __metadata("design:type", Number)
], PacketMT2Network.prototype, "signalStrength", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2Network.prototype, "mcc", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2Network.prototype, "mnc", void 0);
exports.PacketMT2Network = PacketMT2Network;
class PacketMT2Trip {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2Trip.prototype, "time", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2Trip.prototype, "distance", void 0);
exports.PacketMT2Trip = PacketMT2Trip;
class PacketMT2Status {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isLightsOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isBuzzerOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isControllerChecked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isIotChecked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isBatteryChecked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isFailDown", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isEBSBrakeOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isKickstandOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isLineLocked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Status.prototype, "isBatteryLocked", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketMT2Status.prototype, "speed", void 0);
exports.PacketMT2Status = PacketMT2Status;
var PacketMT2ReportReason;
(function (PacketMT2ReportReason) {
    PacketMT2ReportReason[PacketMT2ReportReason["UNAUTHORIZED_MOVEMENT"] = 0] = "UNAUTHORIZED_MOVEMENT";
    PacketMT2ReportReason[PacketMT2ReportReason["PERIODIC_PAYLOAD_SENT"] = 1] = "PERIODIC_PAYLOAD_SENT";
    PacketMT2ReportReason[PacketMT2ReportReason["TRIP_TIME_OUT"] = 2] = "TRIP_TIME_OUT";
    PacketMT2ReportReason[PacketMT2ReportReason["BUZZER_ON_KICKSTAND_MOVED"] = 3] = "BUZZER_ON_KICKSTAND_MOVED";
    PacketMT2ReportReason[PacketMT2ReportReason["BATTERY_FULLY_CHARGED"] = 4] = "BATTERY_FULLY_CHARGED";
    PacketMT2ReportReason[PacketMT2ReportReason["BATTERY_EVENT"] = 5] = "BATTERY_EVENT";
    PacketMT2ReportReason[PacketMT2ReportReason["CONTROLLER_EVENT"] = 6] = "CONTROLLER_EVENT";
    PacketMT2ReportReason[PacketMT2ReportReason["TRIP_START"] = 7] = "TRIP_START";
    PacketMT2ReportReason[PacketMT2ReportReason["TRIP_STOP"] = 8] = "TRIP_STOP";
})(PacketMT2ReportReason = exports.PacketMT2ReportReason || (exports.PacketMT2ReportReason = {}));
class PacketMT2Vehicle {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2Vehicle.prototype, "isEnabled", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PacketMT2Vehicle.prototype, "reportReason", void 0);
exports.PacketMT2Vehicle = PacketMT2Vehicle;
class PacketMT2PowerDetails {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(100),
    __metadata("design:type", Number)
], PacketMT2PowerDetails.prototype, "battery", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketMT2PowerDetails.prototype, "isCharging", void 0);
exports.PacketMT2PowerDetails = PacketMT2PowerDetails;
class PacketMT2Power {
}
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2PowerDetails)
], PacketMT2Power.prototype, "scooter", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2PowerDetails)
], PacketMT2Power.prototype, "iot", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2Power.prototype, "batteryCycle", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2Power.prototype, "speedLimit", void 0);
exports.PacketMT2Power = PacketMT2Power;
class PacketMT2 {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketMT2.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], PacketMT2.prototype, "timestamp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketMT2.prototype, "messageNumber", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2Gps)
], PacketMT2.prototype, "gps", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2Network)
], PacketMT2.prototype, "network", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2Trip)
], PacketMT2.prototype, "trip", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2Vehicle)
], PacketMT2.prototype, "vehicle", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2Power)
], PacketMT2.prototype, "power", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketMT2Status)
], PacketMT2.prototype, "status", void 0);
exports.PacketMT2 = PacketMT2;
function getChargingStatus(pw) {
    const status = [...pw.toString(2)].reverse().join('').padEnd(2, '0');
    return {
        scooter: status[0] === '1',
        iot: status[1] === '1',
    };
}
function getReportReason(rf) {
    const reasons = [];
    const status = [...rf.toString(2)].reverse().join('').padEnd(9, '0');
    if (status[0] === '1')
        reasons.push(PacketMT2ReportReason.UNAUTHORIZED_MOVEMENT);
    if (status[1] === '1')
        reasons.push(PacketMT2ReportReason.PERIODIC_PAYLOAD_SENT);
    if (status[2] === '1')
        reasons.push(PacketMT2ReportReason.TRIP_TIME_OUT);
    if (status[3] === '1')
        reasons.push(PacketMT2ReportReason.BUZZER_ON_KICKSTAND_MOVED);
    if (status[4] === '1')
        reasons.push(PacketMT2ReportReason.BATTERY_FULLY_CHARGED);
    if (status[5] === '1')
        reasons.push(PacketMT2ReportReason.BATTERY_EVENT);
    if (status[6] === '1')
        reasons.push(PacketMT2ReportReason.CONTROLLER_EVENT);
    if (status[7] === '1')
        reasons.push(PacketMT2ReportReason.TRIP_START);
    if (status[8] === '1')
        reasons.push(PacketMT2ReportReason.TRIP_STOP);
    return reasons;
}
function getStatus(io, ws) {
    const status = [...io.toString(2)].reverse().join('').padEnd(10, '0');
    return {
        isLightsOn: status[0] === '1',
        isBuzzerOn: status[1] === '1',
        isControllerChecked: status[2] === '1',
        isIotChecked: status[3] === '1',
        isBatteryChecked: status[4] === '1',
        isFailDown: status[5] === '1',
        isEBSBrakeOn: status[6] === '1',
        isKickstandOn: status[7] === '0',
        isLineLocked: status[8] === '0',
        isBatteryLocked: status[9] === '0',
        speed: ws,
    };
}
function default_1(original) {
    const charging = getChargingStatus(original.pw);
    return {
        type: 2,
        timestamp: moment_1.default(original.rtc),
        messageNumber: original.mn,
        status: getStatus(original.io, original.ws),
        gps: {
            timestamp: moment_1.default(original.gtc),
            latitude: original.la,
            longitude: original.lo,
            satelliteUsedCount: original.su,
            isValid: original.va === 1,
            speed: original.gs,
        },
        network: {
            isRoaming: original.rm === 1,
            signalStrength: original.ss,
            mcc: original.mcc,
            mnc: original.mnc,
        },
        trip: {
            time: original.tt,
            distance: original.td,
        },
        vehicle: {
            isEnabled: original.sf === 1,
            reportReason: getReportReason(original.rf),
        },
        power: {
            batteryCycle: original.cy,
            speedLimit: original.sl,
            scooter: {
                battery: original.sb,
                isCharging: charging.scooter,
            },
            iot: {
                battery: original.ib,
                isCharging: charging.iot,
            },
        },
    };
}
exports.default = default_1;
