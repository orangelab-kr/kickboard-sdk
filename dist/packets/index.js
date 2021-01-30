"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const battery_1 = __importDefault(require("./battery"));
const config_1 = __importDefault(require("./config"));
const info_1 = __importDefault(require("./info"));
const status_1 = __importDefault(require("./status"));
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
