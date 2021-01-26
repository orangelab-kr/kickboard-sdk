"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickboardService = exports.KickboardClient = void 0;
var client_1 = require("./controllers/client");
Object.defineProperty(exports, "KickboardClient", { enumerable: true, get: function () { return __importDefault(client_1).default; } });
var service_1 = require("./controllers/service");
Object.defineProperty(exports, "KickboardService", { enumerable: true, get: function () { return __importDefault(service_1).default; } });
