"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cveRegister_1 = require("../models/cveRegister");
const incidentReport_1 = __importDefault(require("../models/incidentReport"));
const server_1 = __importDefault(require("../models/server"));
const site_1 = __importDefault(require("../models/site"));
class MetadataController {
    /**
     *
     * @param req
     * @param res
     * @returns
     */
    getMetadata(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCveRegisters = yield cveRegister_1.CVERegisterModel.countDocuments();
            const totalServers = yield server_1.default.countDocuments();
            const totalSites = yield site_1.default.countDocuments();
            const totalIncidents = yield incidentReport_1.default.countDocuments();
            const totals = {
                totalCveRegisters,
                totalServers,
                totalSites,
                totalIncidents,
            };
            const recentIncidents = yield incidentReport_1.default.find({})
                .sort({
                createdAt: -1,
            })
                .limit(5);
            const recentCveRegisters = yield cveRegister_1.CVERegisterModel.find({})
                .sort({
                createdAt: -1,
            })
                .limit(5);
            return res.json({
                status: "ok",
                data: {
                    totals,
                    recentIncidents,
                    recentCveRegisters,
                },
            });
        });
    }
}
exports.default = MetadataController;
