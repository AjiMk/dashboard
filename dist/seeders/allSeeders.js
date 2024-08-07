"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSeeders = void 0;
const cveTagsSeeder_1 = __importDefault(require("./cveTagsSeeder"));
const cveRegisterSeeder_1 = __importDefault(require("./cveRegisterSeeder"));
exports.allSeeders = [
    cveTagsSeeder_1.default,
    cveRegisterSeeder_1.default
];
