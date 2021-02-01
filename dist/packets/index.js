"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MT2 = exports.MT1 = exports.MT4 = exports.PacketBattery = exports.MT5 = void 0;
const info_1 = __importDefault(require("./info"));
const status_1 = __importDefault(require("./status"));
const config_1 = __importDefault(require("./config"));
const battery_1 = __importDefault(require("./battery"));
__exportStar(require("./battery"), exports);
var battery_2 = require("./battery");
Object.defineProperty(exports, "MT5", { enumerable: true, get: function () { return __importDefault(battery_2).default; } });
Object.defineProperty(exports, "PacketBattery", { enumerable: true, get: function () { return battery_2.PacketBattery; } });
__exportStar(require("./config"), exports);
var config_2 = require("./config");
Object.defineProperty(exports, "MT4", { enumerable: true, get: function () { return __importDefault(config_2).default; } });
__exportStar(require("./info"), exports);
var info_2 = require("./info");
Object.defineProperty(exports, "MT1", { enumerable: true, get: function () { return __importDefault(info_2).default; } });
__exportStar(require("./status"), exports);
var status_2 = require("./status");
Object.defineProperty(exports, "MT2", { enumerable: true, get: function () { return __importDefault(status_2).default; } });
function default_1(original) {
    if (original.mt === 1)
        return info_1.default(original);
    else if (original.mt === 2)
        return status_1.default(original);
    else if (original.mt === 4)
        return config_1.default(original);
    else if (original.mt === 5)
        return battery_1.default(original);
}
exports.default = default_1;
