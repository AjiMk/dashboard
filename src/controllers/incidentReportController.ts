import { Request, Response } from "express";
import IncidentReport from "../models/incidentReport";

export default class IncidentReportController {
  public async incidentDataTable(req: Request, res: Response) {
    const allIncidents = await IncidentReport.aggregate([
      {
        $lookup: {
          from: "servers", // The collection to join
          localField: "server", // Field from the orders collection
          foreignField: "_id", // Field from the customers collection
          as: "server", // The name of the new array field to add to the orders documents
        },
      },
      {
        $unwind: {
          path: "$server_info",
          preserveNullAndEmptyArrays: true, // This ensures that unmatched orders still appear in the results
        },
      },
    ]).sort({ createdAt: -1 });

    return res.render("dataTables/incidents-report-table", {
      data: allIncidents,
    });
  }

  /**
   * All incidents table view
   *
   */
  public tableView(req: Request, res: Response) {
    res.render("pages/incidens-table", { title: "All Incidents", test: "aaa" });
  }
}
