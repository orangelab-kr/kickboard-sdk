"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmOff = exports.AlarmOn = void 0;
function AlarmOn(mode, seconds = 0) {
    return { cmd: 'alarmon', value: `${mode},${seconds}` };
}
exports.AlarmOn = AlarmOn;
function AlarmOff() {
    return { cmd: 'alarmoff' };
}
exports.AlarmOff = AlarmOff;
