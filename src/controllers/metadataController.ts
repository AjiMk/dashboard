import { Request, Response } from "express";
import { CVERegisterModel } from "../models/cveRegister";
import IncidentReport from "../models/incidentReport";
import Server from "../models/server";
import Site from "../models/site";

export default class MetadataController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public async getMetadata(req: Request, res: Response) {
    const totalCveRegisters = await CVERegisterModel.countDocuments();
    const totalServers = await Server.countDocuments();
    const totalSites = await Site.countDocuments();
    const totalIncidents = await IncidentReport.countDocuments();

    const totals = {
      totalCveRegisters,
      totalServers,
      totalSites,
      totalIncidents,
    };

    const recentIncidents = await IncidentReport.find({})
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const recentCveRegisters = await CVERegisterModel.find({})
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
  }
}
