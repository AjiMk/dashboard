import { readFile } from "fs/promises";
import { CVERegisterModel } from "../models/cveRegister";
import mongoose from "mongoose";
import config from "../config/config";

async function main() {
  await mongoose.connect(config.dbURI, {});

  const file =
    "/home/Ajay/Projects/hackathon/cvelistV5/cves/2024/32xxx/CVE-2024-32100.json";

  const content = await readFile(file, { encoding: "utf-8" });

  const cveData = JSON.parse(content);
  cveData.tags = ["php"];

  await CVERegisterModel.create(cveData);
  console.log("passed");
}

main();
