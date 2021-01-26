"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryUnlock = exports.BatteryLock = void 0;
function BatteryLock() {
    return { cmd: 'batlock' };
}
exports.BatteryLock = BatteryLock;
function BatteryUnlock() {
    return { cmd: 'batunlock' };
}
exports.BatteryUnlock = BatteryUnlock;
