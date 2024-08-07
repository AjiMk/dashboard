import mongoose, { Document, Schema, Types } from "mongoose";

// Define the interface for the document
export interface IIncidentReport extends Document {
  cve_id: string;
  website: string;
  server: Types.ObjectId;
  tags: string[];
}

// Create the schema corresponding to the document interface
const IncidentReportSchema: Schema = new Schema(
  {
    server: { type: Types.ObjectId, required: true },
    website: { type: String, required: true },
    cve_id: { type: String, required: true },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);

// Create the Mongoose model
const IncidentReport = mongoose.model<IIncidentReport>(
  "incident_report",
  IncidentReportSchema
);

export default IncidentReport;
