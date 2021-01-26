"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSet = exports.ConfigRestore = exports.ConfigMT5 = exports.ConfigMT2 = exports.ConfigMT1 = exports.ConfigMT4 = void 0;
function ConfigMT4() {
    return { cmd: 'getconfig' };
}
exports.ConfigMT4 = ConfigMT4;
function ConfigMT1() {
    return { cmd: 'getmt1packet' };
}
exports.ConfigMT1 = ConfigMT1;
function ConfigMT2() {
    return { cmd: 'getmt2packet' };
}
exports.ConfigMT2 = ConfigMT2;
function ConfigMT5() {
    return { cmd: 'getmt5packet' };
}
exports.ConfigMT5 = ConfigMT5;
function ConfigRestore() {
    return { cmd: 'restore' };
}
exports.ConfigRestore = ConfigRestore;
function ConfigSet(key, value) {
    return { cmd: 'param', value: `${key},${value}` };
}
exports.ConfigSet = ConfigSet;
