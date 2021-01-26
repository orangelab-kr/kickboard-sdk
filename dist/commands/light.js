"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightOff = exports.LightOn = void 0;
function LightOn(mode, seconds = 0) {
    return { cmd: 'lighton', value: `${mode},${seconds}` };
}
exports.LightOn = LightOn;
function LightOff() {
    return { cmd: 'lightoff' };
}
exports.LightOff = LightOff;
