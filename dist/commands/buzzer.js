"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuzzerOff = exports.BuzzerOn = void 0;
function BuzzerOn(mode, seconds = 0) {
    return { cmd: 'buzon', value: `${mode},${seconds}` };
}
exports.BuzzerOn = BuzzerOn;
function BuzzerOff() {
    return { cmd: 'buzoff' };
}
exports.BuzzerOff = BuzzerOff;
