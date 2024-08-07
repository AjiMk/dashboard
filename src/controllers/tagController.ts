import { Request, Response } from "express";
import { TagCriteriaModel } from "../models/tagCriteria";

export default class TagController {
  /**
   * All incidents table view
   *
   */
  public async all(req: Request, res: Response) {
    const tag = await TagCriteriaModel.find({});
    let allTags: string[] = [];

    for (let i = 0; i < tag.length; i++) {
      const tags = tag[i].tags;
      allTags = allTags.concat(tags);
    }

    return res.json({ status: "ok", data: allTags });
  }
}
