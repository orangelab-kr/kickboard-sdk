"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mt1_1 = __importDefault(require("./mt1"));
const mt2_1 = __importDefault(require("./mt2"));
const mt4_1 = __importDefault(require("./mt4"));
const mt5_1 = __importDefault(require("./mt5"));
function default_1(original) {
    if (original.mt === 1)
        return mt1_1.default(original);
    else if (original.mt === 2)
        return mt2_1.default(original);
    else if (original.mt === 4)
        return mt4_1.default(original);
    else if (original.mt === 5)
        return mt5_1.default(original);
}
exports.default = default_1;
