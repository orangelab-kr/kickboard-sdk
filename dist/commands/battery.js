"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryUnlock = exports.BatteryLock = exports.BatteryStatus = void 0;
function BatteryStatus() {
    return { cmd: 'getmt5packet' };
}
exports.BatteryStatus = BatteryStatus;
function BatteryLock() {
    return { cmd: 'batlock' };
}
exports.BatteryLock = BatteryLock;
function BatteryUnlock() {
    return { cmd: 'batunlock' };
}
exports.BatteryUnlock = BatteryUnlock;
