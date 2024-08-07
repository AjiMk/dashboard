import { Request, Response } from "express";
import { CVERegisterModel } from "../models/cveRegister";

export default class CveRegisterController {
  /**
   * All incidents table view
   *
   */
  public async tableView(req: Request, res: Response) {
    res.render("pages/cve-registers", {
      title: "All Incidents",
    });
  }

  public async allRegisters(req: Request, res: Response) {
    const page: number = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const search = req.query.search || "";
    const option = req.query.option || "";

    const filterQuery: any = { dataType: "CVE_RECORD" };

    if (search) {
      filterQuery["$or"] = [
        { "cveMetadata.cveId": { $regex: search, $options: "i" } },
        { tags: { $in: [search] } },
      ];
    }

    const allRegisters = await CVERegisterModel.find(filterQuery)
      .limit(limit)
      .skip(page)
      .sort({ createdAt: -1 });

    return res.render("dataTables/cve-register-table", {
      data: allRegisters,
    });
  }
}
