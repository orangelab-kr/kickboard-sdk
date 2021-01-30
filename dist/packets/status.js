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
exports.PacketStatus = exports.PacketStatusPower = exports.PacketStatusPowerDetails = exports.PacketStatusVehicle = exports.PacketStatusReportReason = exports.PacketStatusTrip = exports.PacketStatusNetwork = exports.PacketStatusGps = void 0;
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
class PacketStatusGps {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], PacketStatusGps.prototype, "timestamp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(-90),
    class_validator_1.Max(90),
    __metadata("design:type", Number)
], PacketStatusGps.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(-180),
    class_validator_1.Max(180),
    __metadata("design:type", Number)
], PacketStatusGps.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketStatusGps.prototype, "satelliteUsedCount", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatusGps.prototype, "isValid", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketStatusGps.prototype, "speed", void 0);
exports.PacketStatusGps = PacketStatusGps;
class PacketStatusNetwork {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatusNetwork.prototype, "isRoaming", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(99),
    __metadata("design:type", Number)
], PacketStatusNetwork.prototype, "signalStrength", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketStatusNetwork.prototype, "mcc", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketStatusNetwork.prototype, "mnc", void 0);
exports.PacketStatusNetwork = PacketStatusNetwork;
class PacketStatusTrip {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketStatusTrip.prototype, "time", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketStatusTrip.prototype, "distance", void 0);
exports.PacketStatusTrip = PacketStatusTrip;
var PacketStatusReportReason;
(function (PacketStatusReportReason) {
    PacketStatusReportReason[PacketStatusReportReason["UNAUTHORIZED_MOVEMENT"] = 0] = "UNAUTHORIZED_MOVEMENT";
    PacketStatusReportReason[PacketStatusReportReason["PERIODIC_PAYLOAD_SENT"] = 1] = "PERIODIC_PAYLOAD_SENT";
    PacketStatusReportReason[PacketStatusReportReason["TRIP_TIME_OUT"] = 2] = "TRIP_TIME_OUT";
    PacketStatusReportReason[PacketStatusReportReason["BUZZER_ON_KICKSTAND_MOVED"] = 3] = "BUZZER_ON_KICKSTAND_MOVED";
    PacketStatusReportReason[PacketStatusReportReason["BATTERY_FULLY_CHARGED"] = 4] = "BATTERY_FULLY_CHARGED";
    PacketStatusReportReason[PacketStatusReportReason["BATTERY_EVENT"] = 5] = "BATTERY_EVENT";
    PacketStatusReportReason[PacketStatusReportReason["CONTROLLER_EVENT"] = 6] = "CONTROLLER_EVENT";
    PacketStatusReportReason[PacketStatusReportReason["TRIP_START"] = 7] = "TRIP_START";
    PacketStatusReportReason[PacketStatusReportReason["TRIP_STOP"] = 8] = "TRIP_STOP";
})(PacketStatusReportReason = exports.PacketStatusReportReason || (exports.PacketStatusReportReason = {}));
class PacketStatusVehicle {
}
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatusVehicle.prototype, "isEnabled", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PacketStatusVehicle.prototype, "reportReason", void 0);
exports.PacketStatusVehicle = PacketStatusVehicle;
class PacketStatusPowerDetails {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(100),
    __metadata("design:type", Number)
], PacketStatusPowerDetails.prototype, "battery", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatusPowerDetails.prototype, "isCharging", void 0);
exports.PacketStatusPowerDetails = PacketStatusPowerDetails;
class PacketStatusPower {
}
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusPowerDetails)
], PacketStatusPower.prototype, "scooter", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusPowerDetails)
], PacketStatusPower.prototype, "iot", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketStatusPower.prototype, "batteryCycle", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PacketStatusPower.prototype, "speedLimit", void 0);
exports.PacketStatusPower = PacketStatusPower;
class PacketStatus {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", String)
], PacketStatus.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], PacketStatus.prototype, "timestamp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketStatus.prototype, "messageNumber", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusGps)
], PacketStatus.prototype, "gps", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusNetwork)
], PacketStatus.prototype, "network", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusTrip)
], PacketStatus.prototype, "trip", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusVehicle)
], PacketStatus.prototype, "vehicle", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", PacketStatusPower)
], PacketStatus.prototype, "power", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isLightsOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isBuzzerOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isControllerChecked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isIotChecked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isBatteryChecked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isFailDown", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isEBSBrakeOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isKickstandOn", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isLineLocked", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], PacketStatus.prototype, "isBatteryLocked", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255),
    __metadata("design:type", Number)
], PacketStatus.prototype, "speed", void 0);
exports.PacketStatus = PacketStatus;
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
        reasons.push(PacketStatusReportReason.UNAUTHORIZED_MOVEMENT);
    if (status[1] === '1')
        reasons.push(PacketStatusReportReason.PERIODIC_PAYLOAD_SENT);
    if (status[2] === '1')
        reasons.push(PacketStatusReportReason.TRIP_TIME_OUT);
    if (status[3] === '1')
        reasons.push(PacketStatusReportReason.BUZZER_ON_KICKSTAND_MOVED);
    if (status[4] === '1')
        reasons.push(PacketStatusReportReason.BATTERY_FULLY_CHARGED);
    if (status[5] === '1')
        reasons.push(PacketStatusReportReason.BATTERY_EVENT);
    if (status[6] === '1')
        reasons.push(PacketStatusReportReason.CONTROLLER_EVENT);
    if (status[7] === '1')
        reasons.push(PacketStatusReportReason.TRIP_START);
    if (status[8] === '1')
        reasons.push(PacketStatusReportReason.TRIP_STOP);
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
        type: 'status',
        timestamp: moment_1.default(original.rtc),
        messageNumber: original.mn,
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
        ...getStatus(original.io, original.ws),
    };
}
exports.default = default_1;
