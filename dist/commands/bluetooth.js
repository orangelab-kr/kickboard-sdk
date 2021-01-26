"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BluetoothOff = exports.BluetoothOn = void 0;
function BluetoothOn() {
    return { cmd: 'bleon' };
}
exports.BluetoothOn = BluetoothOn;
function BluetoothOff() {
    return { cmd: 'bleoff' };
}
exports.BluetoothOff = BluetoothOff;
