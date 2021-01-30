"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSet = exports.ConfigRestore = exports.ConfigGet = void 0;
function ConfigGet() {
    return { cmd: 'getconfig' };
}
exports.ConfigGet = ConfigGet;
function ConfigRestore() {
    return { cmd: 'restore' };
}
exports.ConfigRestore = ConfigRestore;
function ConfigSet(key, value) {
    return { cmd: 'param', value: `${key},${value}` };
}
exports.ConfigSet = ConfigSet;
