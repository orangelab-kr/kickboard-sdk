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
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPacket = void 0;
const _1 = require(".");
__exportStar(require("./battery"), exports);
__exportStar(require("./config"), exports);
__exportStar(require("./info"), exports);
__exportStar(require("./status"), exports);
function convertPacket(original) {
    if (original.mt === 1)
        return _1.convertInfoPacket(original);
    else if (original.mt === 2)
        return _1.convertStatusPacket(original);
    else if (original.mt === 4)
        return _1.convertConfigPacket(original);
    else if (original.mt === 5)
        return _1.convertBatteryPacket(original);
}
exports.convertPacket = convertPacket;
