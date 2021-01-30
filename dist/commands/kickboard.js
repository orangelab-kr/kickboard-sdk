"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickboardStatus = exports.KickboardInfo = exports.KickboardReboot = exports.KickboardUnlock = exports.KickboardLock = exports.KickboardStop = exports.KickboardStart = void 0;
function KickboardStart() {
    return { cmd: 'start' };
}
exports.KickboardStart = KickboardStart;
function KickboardStop() {
    return { cmd: 'stop' };
}
exports.KickboardStop = KickboardStop;
function KickboardLock() {
    return { cmd: 'lock' };
}
exports.KickboardLock = KickboardLock;
function KickboardUnlock() {
    return { cmd: 'unlock' };
}
exports.KickboardUnlock = KickboardUnlock;
function KickboardReboot() {
    return { cmd: 'restart' };
}
exports.KickboardReboot = KickboardReboot;
function KickboardInfo() {
    return { cmd: 'getmt1packet' };
}
exports.KickboardInfo = KickboardInfo;
function KickboardStatus() {
    return { cmd: 'getmt2packet' };
}
exports.KickboardStatus = KickboardStatus;
